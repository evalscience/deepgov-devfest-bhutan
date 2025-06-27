import { Telegraf, Context, session } from "telegraf";
import { message } from "telegraf/filters";
import express from "express";
import dotenv from "dotenv";
import { ensureWebhook, createProofRequest, issueCredential } from "./ndi";
import { handleWebhook } from "./webhook";
import { handleMessage } from "./openai";
import { transcribeAudio } from "./transcription";
import { findProfile, findResponses } from "./db/api";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN!;
const LINK_URL = process.env.LINK_URL!;
const PORT = parseInt(process.env.PORT || "3000", 10);

// Define session interface
interface SessionData {
  requestTimestamps: number[];
}

// Extend context to include session
interface MyContext extends Context {
  session: SessionData;
}

const bot = new Telegraf<MyContext>(BOT_TOKEN);

// Use session middleware
bot.use(session());

// Initialize session data
bot.use(async (ctx, next) => {
  if (!ctx.session) {
    ctx.session = {
      requestTimestamps: [],
    };
  }
  await next();
});

async function handleAuth(ctx: MyContext) {
  if (!checkRateLimit(ctx)) return;

  try {
    const chatId = ctx.chat!.id;
    const userId = ctx.from!.id;

    await ctx.replyWithChatAction("typing");
    await ctx.reply("Creating authentication request...");
    await ensureWebhook();
    const link = await createProofRequest(chatId, userId);

    const url = `${LINK_URL}?link=${encodeURIComponent(link)} 
    `;
    console.log(url);
    await ctx.reply("🔒 Authenticate via Bhutan NDI Wallet:", {
      reply_markup: {
        inline_keyboard: [[{ text: "Authenticate", url }]],
      },
    });
  } catch (error) {
    console.error("Auth command error:", error);
    await ctx.reply("Authentication setup failed. Please try again.");
  }
}

bot.start(async (ctx: MyContext) => {
  await ctx.reply(`Welcome to Takin AI — your thoughtful companion in envisioning Bhutan’s digital journey.
Together, let us explore how emerging technologies like AI, Blockchain, and the National Digital Identity (NDI) can uplift wellbeing while honoring the wisdom of traditions. Your hopes, questions, and ideas will help shape a 2035 where innovation and culture walk hand in hand.

✨ Speak your truth — through text or voice (under 1 minute)
🔐 Please begin by authenticating with your NDI wallet
🌱 Your data is private and all of our code is open-source

You’re warmly encouraged to guide the conversation — shift topics, share new thoughts, or return to earlier dreams at any time. This space is yours to imagine freely.

Your vision matters deeply. Live results: bhutan.deepgov.org
`);
  await handleAuth(ctx);
});

bot.command("auth", handleAuth);

bot.command("claim", async (ctx: MyContext) => {
  try {
    if (!checkRateLimit(ctx)) return;

    const chatId = String(ctx.chat?.id);
    const userId = String(ctx.from?.id);
    const responses = await findResponses(userId);
    console.log(responses);

    const requiredInteractions = 15;
    if (responses.length < requiredInteractions) {
      return ctx.reply(
        `${responses.length}/${requiredInteractions} interactions found. Please interact more with Takin AI before claiming.`
      );
    }
    await ctx.reply(`${responses.length} interactions with Takin AI!`);

    await ctx.reply("Claiming credential...");
    await ensureWebhook();
    const link = await issueCredential(chatId, userId);

    const url = `${LINK_URL}?link=${encodeURIComponent(link)} 
    `;
    console.log(url);
    return ctx.reply("🔒 Claim via Bhutan NDI Wallet:", {
      reply_markup: {
        inline_keyboard: [[{ text: "Claim", url }]],
      },
    });

    // return ctx.reply("Claimed credential! Check your Bhutan NDI Wallet.");
  } catch (error) {
    console.error("Claim command error:", error);
    await ctx.reply("Failed to claim credential. Please try again.");
  }
});

bot.command("profile", async (ctx: MyContext) => {
  if (!checkRateLimit(ctx)) return;

  try {
    await ctx.replyWithChatAction("typing");
    const userId = ctx.from!.id;
    const profile = await findProfile(String(userId));
    if (!profile)
      return ctx.reply("No profile found. Please authenticate first.");
    await ctx.replyWithMarkdownV2(
      `*👤 User Profile*

*Gender:* ${profile.gender}
*Date of Birth:* ${new Date(profile.dob).toLocaleDateString()}
*Citizenship:* ${profile.citizenship}
*Address:*
• Village: ${profile.address1}
• Gewog: ${profile.address2}
• Dzongkhag: ${profile.address3}
    `
    );
  } catch (error) {
    console.error("Profile command error:", error);
    await ctx.reply("Fetching profile failed. Please try again.");
  }
});

bot.on(message("text"), async (ctx: MyContext) => {
  if (!checkRateLimit(ctx)) return;

  if (!ctx.chat || !ctx.from || !ctx.message || !("text" in ctx.message)) {
    await ctx.reply("Invalid message format.");
    return;
  }

  const chatId = ctx.chat.id;
  const userId = ctx.from.id;
  const userInput = ctx.message.text;

  const reply = await handleMessage(chatId, userId, userInput);
  await ctx.reply(reply);
});

bot.on(message("voice"), async (ctx: MyContext) => {
  if (!checkRateLimit(ctx)) return;

  if (!ctx.chat || !ctx.from || !ctx.message || !("voice" in ctx.message)) {
    await ctx.reply("Invalid voice message format.");
    return;
  }

  const chatId = ctx.chat.id;
  const userId = ctx.from.id;

  try {
    await ctx.reply("🎵 Processing your voice message...");

    const fileId = ctx.message.voice.file_id;
    const file = await ctx.telegram.getFile(fileId);
    const fileUrl = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/${file.file_path}`;

    // Transcribe the audio
    const transcription = await transcribeAudio(fileUrl);

    if (transcription && transcription.trim()) {
      await ctx.reply(`🎤 Transcription: "${transcription}"`);

      // Process the transcribed text through the normal message handler
      const reply = await handleMessage(chatId, userId, transcription);
      await ctx.reply(reply);
    } else {
      await ctx.reply(
        "Could not transcribe the audio. Please try again or send a text message."
      );
    }
  } catch (error) {
    console.error("Audio message error:", error);
    await ctx.reply("Failed to process audio message. Please try again.");
  }
});

const app = express();
app.use(express.json());

app.post("/webhook", handleWebhook);
app.listen(PORT, () =>
  console.log(`✅ Webhook server listening on port ${PORT}`)
);

function checkRateLimit(ctx: MyContext): boolean {
  const now = Date.now();
  const windowMs = 3600000; // 1 hour
  const maxRequests = 100;
  const cutoff = now - windowMs;

  // Clean old timestamps
  ctx.session.requestTimestamps = ctx.session.requestTimestamps.filter(
    (timestamp) => timestamp > cutoff
  );

  if (ctx.session.requestTimestamps.length >= maxRequests) {
    ctx.reply("Rate limit exceeded. Please try again later.");
    return false;
  }

  ctx.session.requestTimestamps.push(now);
  return true;
}

// (async () => {
// const WEBHOOK_PATH = `/telegraf/${bot.secretPathComponent()}`;
// const BASE_URL = process.env.BASE_URL; // e.g. "https://mydomain.com"

// await bot.telegram.deleteWebhook();
// })();

await bot.telegram.setMyCommands([
  {
    command: "/auth",
    description: "Authenticate with NDI wallet",
  },
  {
    command: "/profile",
    description: "View your profile",
  },
  {
    command: "/claim",
    description: "Claim your credential",
  },
]);

await bot.launch();

process.once("SIGINT", () => {
  console.info("SIGINT received");
  bot.stop("SIGINT");
});

process.once("SIGTERM", () => {
  console.info("SIGTERM received");
  bot.stop("SIGTERM");
});
