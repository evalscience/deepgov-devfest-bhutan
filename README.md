# Team 12 - DeepGov Bhutan

## 🚀 Project Overview

Brief description of your hackathon project.

**Hackathon Theme**: Developing decentralized applications powered by Bhutan's National Digital Identity

## 👥 Team Members

- **Team Lead**: David Dao - [@daviddao](https://github.com/daviddao) - Team Lead / AI & Research
- **Member 2**: Sharfy Adamantine - [@s-adamantine](https://github.com/s-adamantine) - Team Lead / Frontend
- **Member 3**: Carl Barrdahl - [@carlbarrdahl](https://github.com/carlbarrdahl) - Full Stack / NDI Assistant
- **Member 4**: Satyam Mishra - [@satyam-mishra-pce](https://github.com/satyam-mishra-pce) - Frontend / Dashboard

## 🛠️ Technology Stack

- **Frontend**:

  - Next.js 15.3.4 (React 19.0.0)
  - TypeScript
  - Tailwind CSS v4 + PostCSS
  - shadcn/ui components
  - Radix UI primitives
  - Lucide React icons

- **Backend**:

  - Bun runtime
  - Telegraf (Telegram Bot API)
  - Express.js
  - OpenAI API integration (can be replaced using self-hosted LLMs with Ollama)
  - Axios for HTTP requests

- **Database**:

  - PostgreSQL
  - Drizzle ORM
  - Neon Database (serverless PostgreSQL)
  - Node.js pg driver

- **Other Tools**:
  - Bhutan National Digital Identity (NDI) integration
  - Whisper for Audio transcription

## 🎯 Problem Statement

Bhutan's transition to constitutional monarchy has achieved significant democratic milestones, yet traditional governance faces a fundamental **trilemma**: systems can be participatory, informed, or efficient—but rarely all three simultaneously. This creates critical gaps in democratic participation:

**Traditional Centralized Challenges:**

- **Limited Authentic Representation**: Conventional representative democracy struggles to capture the nuanced values of Bhutan's diverse communities, from Buddhist monastics to Nepali-speaking southern districts across 20 dzongkhags
- **Participation Barriers**: Low political awareness, underrepresentation of youth and women, and minimal rural community engagement limit inclusive governance
- **Scalability Constraints**: Complex policy decisions and resource allocation processes cannot efficiently incorporate citizen input while maintaining democratic legitimacy

**Self-Sovereign Identity Opportunity:**
Bhutan has pioneered National Digital Identity (NDI) infrastructure that enables verified citizen participation, yet this powerful technology remains **critically underutilized** for evidence-driven policy making. Unlike anonymous surveys or social media polls vulnerable to manipulation, NDI provides authentic "one verified citizen, one voice" foundations for legitimate democratic consultation on any policy topic.

**Democratic Participation Gap:**
Traditional policy-making processes lack systematic mechanisms to gather, analyze, and integrate authentic citizen perspectives into governance decisions. Policymakers operate with limited evidence about citizen values and preferences, while citizens have minimal opportunities to meaningfully influence policy development across diverse topics - from healthcare and education to environmental protection and economic development.

## 💡 Solution

DeepGov Bhutan creates the world's first **NDI-verified AI-assisted evidence-driven policy platform** that enables authentic, large-scale democratic consultation on any policy topic while preserving cultural values and individual privacy.

### **National Digital Identity Integration**

- **Verified Participation**: NDI authentication ensures "one verified citizen, one voice" eliminating fake responses and ensuring representative consultation across all 20 dzongkhags for any policy survey
- **Cultural Authenticity**: NDI demographic data enables culturally-sensitive conversations respecting Buddhist, Nepali, and diverse ethnic community perspectives across all policy domains
- **Multilingual Access**: Native language interfaces (Dzongkha, Nepali, English) connected through verified identity for truly inclusive democratic participation

### **AI-Assisted Governance Platform**

- **Flexible Policy Surveys**: System prompts can be dynamically adjusted to conduct evidence gathering on any policy topic - healthcare, education, environment, economy, or governance reforms
- **Conversational Evidence Gathering**: Takin AI engages citizens in nuanced discussions guided by Gross National Happiness principles, extracting deeper insights than traditional surveys
- **Broad Listening Integration**: Taiwan-proven methodology analyzes citizen input to identify consensus areas, value clusters, and polarization patterns across communities
- **Value-Aligned Policy Tools**: Citizen insights are synthesized into value-aligned screening and review frameworks that help policymakers evaluate proposals against authentic community values
- **Real-Time Democratic Intelligence**: Live dashboard provides policymakers with evidence-based insights into citizen priorities and concerns across policy domains

### **User Empowerment**

- **Data Sovereignty**: Citizens control their consultation data through self-sovereign identity and can withdraw participation at any time
- **Transparent Process**: Open-source system ensures citizens understand how their input is collected and analyzed
- **Meaningful Recognition**: Civic engagement credentials reward sustained participation in national visioning processes
- **Voice-First Accessibility**: Voice message support enables participation regardless of literacy levels or physical disabilities
- **Self-Hosted Option**: The code is written to completely swap out the OpenAI API with a self-hosted Ollama option (described below) to ensure data sovereignity

### **Innovation Factor**

DeepGov Bhutan represents the **first NDI-verified AI-assisted Governance Platform**. By combining NDI authentication with conversational AI, we enable unprecedented authentic citizen input into long-term national planning while maintaining Bhutan's unique cultural heritage and democratic values. This creates replicable infrastructure for legitimate policy consultation that amplifies citizen voices in constitutional monarchy frameworks.

## 🏗️ Setup Instructions

### Prerequisites

- Git
- Bun
- Postgres

### Getting Started

```bash
# Clone the repository
git clone --recursive https://github.com/DevFest-Hackaton/DevFestTeam12.git
cd DevFestTeam12

# Run the visualisation dashboard
cd broad-listening
bun install
bun dev

# Run the Telegram Chatbot
cd deepgov-ndi-bot
bun install
cp .env.example .env
# Edit .env with your API keys
bun run dev
```

## 🌟 Key Features

- [x] **NDI Integration**: Seamless authentication with Bhutan's National Digital Identity wallet, supporting proof requests for citizen verification and verifiable credential issuance for civic engagement
- [x] **AI-Powered Civic Engagement**: Conversational AI system (Takin AI) that engages citizens in policy discussions while respecting Bhutanese cultural values and Gross National Happiness principles
- [x] **Multilingual Voice Support**: Voice message transcription and processing in multiple languages, making civic participation accessible across Bhutan's diverse linguistic communities
- [x] **Privacy-First Architecture**: User IDs hashed with HMAC-SHA256, minimal data collection, and option for self-hosted LLMs to ensure government data sovereignty
- [x] **Verified Participation System**: Citizens earn civic engagement credentials after meaningful participation (15+ interactions), creating authentic "one citizen, one voice" democratic input
- [x] **Real-Time Analytics Dashboard**: Live visualization of citizen sentiment, demographic insights, and policy preference clustering using Taiwan's proven "broad listening" methodology
- [x] **Rate-Limited Secure Access**: 100 requests/hour rate limiting with session management prevents abuse while ensuring equitable access to civic engagement tools
- [x] **Constitutional AI Framework**: AI responses guided by constitutional principles emphasizing cultural preservation, environmental sustainability, and community well-being over pure economic metrics

## 🔐 Security & Privacy

- **Data Protection**:

  - User IDs are hashed using HMAC-SHA256 with salt for anonymization
  - Environment variables secure API keys and sensitive configuration
  - PostgreSQL database with proper schema validation via Drizzle ORM
  - Open-source codebase for transparency and auditability

- **Identity Verification**:

  - Integration with Bhutan's National Digital Identity (NDI) wallet system
  - OAuth2 authentication with NDI staging environment
  - Cryptographic proof verification for identity claims
  - Verifiable credentials issued through NDI schemas (Foundation ID, Address ID, Civic Champion)

- **Rate Limiting & Session Security**:

  - 100 requests per hour per user to prevent abuse
  - Session-based user state management with Telegraf framework
  - Request timestamps tracked and cleaned automatically
  - HMAC webhook verification for secure NDI callbacks

- **Privacy Features**:
  - User data minimization - only necessary identity attributes stored
  - Credential claims require minimum 15 interactions to earn
  - Self-hosted LLM option (Ollama) to avoid data sharing with external AI services
  - VPN-secured infrastructure for development and production environments

## 💬 How to Self-Host the LLMs

For production and government-sensitive work, we recommend to self-host LLM API calls instead of relying on OpenAI API. Below we document the small changes needed to run a local open-source Llama3.1 model (or internal Dzongkha LLM) for the Telegram Bot.

### 1. Install Ollama

```bash
# Install Ollama (Linux/macOS)
curl -fsSL https://ollama.ai/install.sh | sh

# Pull a model (e.g., llama3.1)
ollama pull llama3.1
```

### 2. Update Environment Variables

```bash
# In .env file
# OPENAI_API_KEY=your_key  # Comment out
OLLAMA_BASE_URL=http://localhost:11434  # Add this
OLLAMA_MODEL=llama3.1  # Add this
```

### 3. Modify `deepgov-ndi-bot/src/openai.ts`

```typescript
// Replace OpenAI import and client
import axios from "axios";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.1";

// Replace handleMessage function's OpenAI call:
const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
  model: OLLAMA_MODEL,
  prompt: `${systemPrompt}\n\nUser: ${content}\nAssistant:`,
  stream: false,
});

return response.data.response;
```

### 4. Update package.json (optional)

```bash
# Remove OpenAI dependency
bun remove openai
```

## 📱 Demo

- **Live Demo**: [URL if deployed]
- **Video Demo**: [URL to demo video]
- **Presentation**: [URL to presentation slides]

## 🏆 DevFest Hackathon 2025 Details

- **Event**: Developing Decentralized Applications Powered by Bhutan's National Digital Identity
- **Dates**: June 25-27, 2025
- **Location**: Bhutan (with international participation)
- **Organizers**: GovTech Bhutan & Ethereum Foundation
- **Theme**: Open theme hackathon driven by decentralized technology and NDI
- **Focus Areas**:
  - National Digital Identity applications
  - Decentralized technology solutions
  - Self-sovereign identity frameworks
  - Blockchain innovation

## 🎖️ Hackathon Objectives

Our project contributes to the hackathon's objectives by:

- [ ] Exploring innovative applications leveraging NDI
- [ ] Demonstrating decentralized technology capabilities
- [ ] Empowering citizens with data ownership
- [ ] Building solutions for real-world challenges
- [ ] Contributing to Bhutan's position in decentralized identity space

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.txt](LICENSE.txt) file for details.
