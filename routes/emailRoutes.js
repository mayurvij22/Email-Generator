import express from "express";
import { generateEmail } from "../services/geminiService.js";

const router = express.Router();

/**
 * POST /api/email/generate
 * Accepts both:
 * 1️⃣ Structured data (JSON)
 * 2️⃣ Raw user input (free text)
 */
router.post("/generate", async (req, res) => {
  try {
    const body = req.body;

    let inputData = {};

    // 🧠 If user gives raw text (like { "input": "Apply for backend dev at Google" })
    if (typeof body === "string" || body.input) {
      const userInput = body.input || body;

      // Try to extract info using regex (simple fallback)
      const jobRoleMatch = userInput.match(/(developer|engineer|designer|manager|intern|analyst)/i);
      const companyMatch = userInput.match(/at\s+([A-Za-z0-9\s&]+)/i);

      inputData = {
        name: "Candidate", // fallback if not provided
        hrEmail: "hr@company.com",
        jobRole: jobRoleMatch ? jobRoleMatch[0] : "Software Engineer",
        company: companyMatch ? companyMatch[1].trim() : "the company",
        education: "B.Tech in Computer Science",
        skills: "React, Node.js, and modern web development",
        location: "India",
      };
    } else {
      // If structured JSON is provided
      inputData = {
        name: body.name || "Candidate",
        hrName: body.hrName || "HR",
        hrEmail: body.hrEmail || "hr@company.com",
        jobRole: body.jobRole || "Software Engineer",
        company: body.company || "the company",
        companyPhone: body.companyPhone || "",
        userEmail: body.userEmail || "candidate@email.com",
        userPhone: body.userPhone || "",
        education: body.education || "B.Tech in Computer Science",
        skills: body.skills || "JavaScript, React, Node.js",
        location: body.location || "India",
      };
    }

    // ✅ Generate using Gemini
    const emailData = await generateEmail(inputData);

    res.status(200).json({
      success: true,
      parsedInput: inputData,
      generated: emailData,
    });
  } catch (error) {
    console.error("❌ Error generating email:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
});

export default router;
