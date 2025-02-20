import { Router } from 'express';
import axios from 'axios';

const router = Router();

// ✅ Fetch latest notifications from Slack and Jira
router.get('/notifications', async (req, res) => {
    try {
        const slackResponse = await axios.get('https://slack.com/api/conversations.history', {
            params: {
                channel: process.env.SLACK_CHANNEL_ID,
                limit: 5
            },
            headers: {
                Authorization: `Bearer ${process.env.SLACK_TOKEN}`
            }
        });

        const jiraResponse = await axios.get(
            `${process.env.JIRA_URL}/rest/api/3/search?jql=project=${process.env.JIRA_PROJECT_KEY}`,
            {
                auth: {
                    username: process.env.JIRA_EMAIL,
                    password: process.env.JIRA_API_TOKEN
                },
                headers: { 'Accept': 'application/json' }
            }
        );

        res.json({
            slack: slackResponse.data.messages,
            jira: jiraResponse.data.issues
        });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

export default router;
