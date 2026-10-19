<div align="center">

# ✉️ AI Cold Email Generator

**Generate a polished job-application email for HR in seconds, powered by Google Gemini.**

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?logo=googlegemini&logoColor=white)

</div>

---

## ✨ Features

- **Two input modes**
  - **Structured**: HR name and email, job role, company, education, skills, location
  - **Free text**: paste a raw job posting or message, and the role and company are extracted automatically
- **AI-written subject and body** from Gemini, using **structured JSON output** so the result is always a clean `{ subject, body }`
- Derives a fallback HR address (`hr@<company>.com`) when none is given
- Sanitises and normalises the generated text
- A simple web page (`index.html`) for filling in details, with **copy subject** and **copy body** buttons

## 📡 API

### `POST /api/email/generate`

**Structured input:**

```json
{
  "name": "Mayur Patil",
  "hrName": "Ms. Priya Singh",
  "hrEmail": "hr@acme.com",
  "jobRole": "Frontend Developer",
  "company": "Acme",
  "education": "B.Tech in CSE",
  "skills": "React, Node.js",
  "location": "Bangalore, India"
}
```

**Or free text:**

```json
{ "input": "Applying for a React developer role at Acme Corp" }
```

**Response:**

```json
{
  "success": true,
  "parsedInput": { "jobRole": "Frontend Developer", "company": "Acme" },
  "generated": {
    "subject": "Application for Frontend Developer at Acme",
    "body": "Dear Ms. Priya Singh, ..."
  }
}
```

## 🚀 Run locally

```bash
git clone https://github.com/mayurvij22/Email-Generator.git
cd Email-Generator
npm install
```

Create a `.env` file:

```env
GEMINI_API_KEY=your_key_from_aistudio.google.com
PORT=5000
```

```bash
npm run dev
```

## 🛠️ Tech stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express |
| AI | Google Gemini (`@google/generative-ai`) with a JSON response schema |
| Frontend | HTML, CSS, JavaScript |

## 📁 Project structure

```text
├── index.js                  # Express app, mounts /api/email
├── routes/emailRoutes.js     # Parses structured or free-text input
├── services/geminiService.js # Prompt, JSON schema, sanitising
└── index.html                # Simple UI
```

---

<div align="center">

Made by **[Mayur Patil](https://github.com/mayurvij22)**

</div>
