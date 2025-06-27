# Team 12 - DeepGov Bhutan

## 🚀 Project Overview
Brief description of your hackathon project.

    **Hackathon Theme**: Developing decentralized applications powered by Bhutan's National Digital Identity

## 👥 Team Members
- **Team Lead**: David Dao - @daviddao - Team Lead / AI & Research
- **Member 2**: Sharfy Adamantine - @s-adamantine - Team Lead / Frontend
- **Member 3**: Carl Barrdahl - @carlbarrdahl - Full Stack / NDI Assistant
- **Member 4**: Satyam Mishra - @satyam-mishra-pce - Frontend / Dashboard

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
  - Express.js
  - Telegraf (Telegram Bot API)
  - OpenAI API integration (can be replaced using self-hosted LLMs with Ollama)
  - Axios for HTTP requests

- **Database**: 
  - PostgreSQL
  - Drizzle ORM
  - Neon Database (serverless PostgreSQL)
  - Node.js pg driver

- **Other Tools**: 
  - Bhutan National Digital Identity (NDI) integration
  - Crypto/DID (Decentralized Identity) support
  - Audio transcription capabilities
  - Rate limiting and session management
  - Husky for Git hooks
  - ESLint for code quality

## 🎯 Problem Statement

Bhutan's transition to constitutional monarchy has achieved significant democratic milestones, yet traditional governance faces a fundamental **trilemma**: systems can be participatory, informed, or efficient—but rarely all three simultaneously. This creates critical gaps in democratic participation:

**Traditional Centralized Challenges:**
- **Limited Authentic Representation**: Conventional representative democracy struggles to capture the nuanced values of Bhutan's diverse communities, from Buddhist monastics to Nepali-speaking southern districts across 20 dzongkhags
- **Participation Barriers**: Low political awareness, underrepresentation of youth and women, and minimal rural community engagement limit inclusive governance
- **Scalability Constraints**: Complex policy decisions and resource allocation processes cannot efficiently incorporate citizen input while maintaining democratic legitimacy

**Self-Sovereign Identity Opportunity:**
Bhutan has pioneered National Digital Identity (NDI) infrastructure that enables verified citizen participation, yet this powerful technology remains **critically underutilized** for transforming governance itself. Unlike token-based systems vulnerable to wealth concentration and Sybil attacks, NDI provides authentic "one verified citizen, one voice" foundations for legitimate digital democracy.

**Data Sovereignty Crisis:**
Citizens currently have minimal control over how their preferences, values, and policy inputs are collected, processed, and represented in governance decisions, creating disconnection between authentic community values and governmental actions.

## 💡 Solution

DeepGov Bhutan creates the world's first **NDI-verified AI-assisted democratic governance system** that solves the authentication problem plaguing decentralized governance while scaling authentic citizen participation.

### **National Digital Identity Integration**
- **Verified Participation**: NDI authentication ensures "one verified citizen, one voice" eliminating Sybil attacks and fake participation common in token-based DAOs
- **Cultural Authenticity**: NDI enables demographic-aware AI representatives reflecting authentic Buddhist, Nepali, and diverse ethnic community values
- **Multilingual Access**: Native language interfaces (Dzongkha, Nepali, English) connected through verified identity for inclusive participation

### **Decentralized Architecture**
- **Configurable AI Representatives**: Citizens co-design and elect AI governance assistants for each dzongkhag and demographic group using quadratic voting mechanisms
- **Polis Consensus Integration**: Taiwan-proven "broad listening" tools identify value clusters and build consensus across polarized communities without centralized manipulation
- **Blockchain Governance**: Smart contracts on Ethereum/Polygon enable transparent, tamper-proof voting and resource allocation decisions
- **Zero-Knowledge Proofs**: Maintain privacy while ensuring verified participation and authentic representation

### **User Empowerment**
- **Data Sovereignty**: Citizens maintain complete control over their governance preferences through self-sovereign identity and encrypted personal data vaults
- **Transparent Reasoning**: Shapley value explanations show exactly how AI representatives reach recommendations, ensuring full accountability to human constituents
- **Continuous Oversight**: Regular feedback and reconfiguration processes allow citizens to update their AI representatives' values and priorities
- **Direct Democratic Input**: Integration with parliamentary processes where AI representatives synthesize citizen input for elected MPs while preserving constitutional monarchy framework

### **Innovation Factor**
DeepGov Bhutan represents the **first implementation of identity-verified, culturally-sensitive AI governance at national scale**. By solving the fundamental authentication challenge that limits most DAO governance systems, we're creating replicable infrastructure for legitimate digital democracy that amplifies rather than replaces human agency. This positions Bhutan as a global leader in authentic democratic participation while maintaining its unique constitutional heritage.

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
- [ ] **NDI Integration**: [Describe NDI integration features]
- [ ] **Decentralized Identity Management**: [Self-sovereign identity features]
- [ ] **Data Ownership**: [How users control their data]
- [ ] **Blockchain Integration**: [Specific blockchain functionalities]
- [ ] **User Authentication**: [Decentralized authentication system]
- [ ] **[Custom Feature 1]**: [Description]
- [ ] **[Custom Feature 2]**: [Description]

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
import axios from 'axios';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.1';

// Replace handleMessage function's OpenAI call:
const response = await axios.post(`${OLLAMA_BASE_URL}/api/generate`, {
  model: OLLAMA_MODEL,
  prompt: `${systemPrompt}\n\nUser: ${content}\nAssistant:`,
  stream: false
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
