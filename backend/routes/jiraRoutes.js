import { Router } from 'express';
import axios from 'axios';

const router = Router();

// ✅ Fetch Jira issues
router.get('/issues', async (req, res) => {
    try {
        const response = await axios.get(
            `${process.env.JIRA_URL}/rest/api/3/search?jql=project=${process.env.JIRA_PROJECT_KEY}`,
            {
                auth: {
                    username: process.env.JIRA_EMAIL,
                    password: process.env.JIRA_API_TOKEN
                },
                headers: { 'Accept': 'application/json' }
            }
        );

        if (!response.data.issues) {
            console.error("Jira API response missing 'issues':", response.data);
            return res.status(500).json({ error: "Invalid Jira API response format" });
        }

        res.json(response.data.issues);
    } catch (error) {
        console.error("Jira API error:", error.response?.data || error.message);
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// ✅ Ensure default export
export default router;
