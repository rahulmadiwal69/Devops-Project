import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/issue', async (req, res) => {
    const { projectKey, summary, description, issueType } = req.body;

    try {
        const response = await axios.post(
            `${process.env.JIRA_URL}/rest/api/3/issue`,
            {
                fields: {
                    project: { key: projectKey },
                    summary,
                    description: {
                        type: "doc",
                        version: 1,
                        content: [{ type: "paragraph", content: [{ text: description, type: "text" }] }]
                    },
                    issuetype: { name: issueType }
                }
            },
            {
                auth: {
                    username: process.env.JIRA_EMAIL,
                    password: process.env.JIRA_API_TOKEN
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// ✅ Ensure default export
export default router;
