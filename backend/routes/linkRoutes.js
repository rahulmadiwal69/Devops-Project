import { Router } from "express";
import axios from "axios";

const router = Router();

router.post("/link-issue", async (req, res) => {
    const { projectKey, summary, description, issueType, repoName } = req.body;

    try {
        // Create Jira Issue
        const jiraResponse = await axios.post(
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
                headers: { "Content-Type": "application/json" }
            }
        );

        const jiraIssueKey = jiraResponse.data.key;

        // Create GitHub Issue & Link to Jira
        const githubResponse = await axios.post(
            `https://api.github.com/repos/${process.env.GITHUB_USERNAME}/${repoName}/issues`,
            { title: summary, body: `Jira Issue: ${jiraIssueKey}\n\n${description}` },
            { headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` } }
        );

        res.json({
            jiraIssueKey,
            githubIssueUrl: githubResponse.data.html_url
        });
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

export default router;
