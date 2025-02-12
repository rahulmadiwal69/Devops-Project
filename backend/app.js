import express, { json } from "express";
import { config } from "dotenv";
import cors from "cors";

// ✅ Load environment variables first
config();

// ✅ Initialize Express app
const app = express();
app.use(json());
app.use(cors());

// ✅ Import route files AFTER initializing `app`
import slackRoutes from "./routes/slackRoutes.js";
import jiraRoutes from "./routes/jiraRoutes.js";
import githubRoutes from "./routes/githubRoutes.js";
import linkRoutes from "./routes/linkRoutes.js"; // ✅ Correct placement

// ✅ Ensure routes are used correctly
app.use("/api/slack", slackRoutes);
app.use("/api/jira", jiraRoutes);
app.use("/api/github", githubRoutes);
app.use("/api/link", linkRoutes); // ✅ Moved to the correct position

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
