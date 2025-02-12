import express, { json } from 'express';
import { config } from 'dotenv';
import cors from 'cors';

config();
const app = express();
app.use(json());
app.use(cors());

// ✅ Ensure proper import of route files
import slackRoutes from './routes/slackRoutes.js';
import jiraRoutes from './routes/jiraRoutes.js';
import githubRoutes from './routes/githubRoutes.js';

// ✅ Ensure routes are used correctly
app.use('/api/slack', slackRoutes);
app.use('/api/jira', jiraRoutes);
app.use('/api/github', githubRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
