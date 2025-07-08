# ⚡️ ZeroAPI — Plug-and-Play Backend, AI Agents & Chatbots (Zero Code)

**ZeroAPI** is a no-code backend platform that empowers frontend developers, indie makers, and startups to create powerful backend APIs, AI agents, and custom chatbots — all without writing or hosting backend code.

## 🚀 What Can You Do With ZeroAPI?

### 🔧 Plug & Play Backend Services
- Build form submission APIs with email notifications
- Upload files and serve them via CDN
- Create and manage backend APIs without any infra
- Integrate easily with any frontend (HTML, React, Vue, Webflow, etc.)

### 🤖 Visual AI Agents
- Build GPT-powered AI agents without coding
- Define workflows visually (Zapier-like flow editor)
- Upload custom data (PDFs, CSV, Docs) to power your agent’s responses
- Deploy publicly accessible endpoints for each agent

### 💬 Custom Embeddable Chatbots
- Create AI-powered chatbots with your own branding
- Train bots on your data with no-code file upload
- Embed with one line of code on any site
- Chat memory & analytics included

---

## 🎯 Who Is It For?

- Frontend Developers who want backend functionality, fast
- Designers and Web Creators using Webflow, Framer, Notion
- Startup builders & hackathon teams
- Educators and portfolio creators

---

## 📦 Tech Stack

| Layer        | Tech                          |
|--------------|-------------------------------|
| Backend      | Django or FastAPI             |
| Database     | PostgreSQL + Redis            |
| File Storage | Cloudflare R2 / S3            |
| AI Layer     | OpenAI + FAISS/pgvector       |
| Frontend     | React + TailwindCSS           |
| Auth         | JWT + API Keys                |
| Hosting      | Railway / Fly.io / Vercel     |

---

## 🛠️ Features Roadmap

| Category         | Feature                            | Status     |
|------------------|-------------------------------------|------------|
| Backend API      | Form submissions + email            | ✅ Done     |
|                  | File upload & CDN URLs              | ✅ Done     |
|                  | API key management                  | ✅ Done     |
| AI Agent Builder | Visual workflow editor              | 🛠️ In Dev   |
|                  | Custom data upload (PDF/CSV)        | 🛠️ In Dev   |
| Chatbots         | Embeddable chatbot widget           | 🛠️ In Dev   |
|                  | Chat memory + session handling      | 🔜 Planned  |
| Integrations     | Webhook + API call blocks           | 🔜 Planned  |
| Analytics        | Request logs, analytics UI          | 🔜 Planned  |

---

## 📂 Example Use Case

```js
import { ZeroAPI } from "zeroapi-sdk"

ZeroAPI.submitForm("contact", {
  name: "John",
  email: "john@example.com",
  message: "I'm interested in your product"
})
```

Embed your chatbot:
```html
<script src="https://cdn.zeroapi.io/chatbot.js" data-bot="support-bot"></script>
```

---

## 🧑‍💻 Getting Started (For Developers)

> Full SDK & API Docs: [Coming Soon](https://zeroapi.io)

### 1. Sign up & create a project  
### 2. Use visual builder to create a form or agent  
### 3. Copy your public endpoint or embed code  
### 4. Done ✅

---

## 🌐 Live Demo & Landing Page

Coming soon: [https://zeroapi.io](https://zeroapi.io)

---

## 🤝 Contributing

We welcome contributions from developers, designers, and AI engineers.

- Clone the repo
- Use the dev guide to run locally
- Submit a PR with clear commit messages

---

## 📬 License

MIT License © 2025 [Shashank Shekhar](https://github.com/shashank-shekhar)

---

## 💡 Made with ❤️ to empower devs who just want to ship faster.
