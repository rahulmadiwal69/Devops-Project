import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.post('/message', async (req, res) => {
    const { channel, text } = req.body;
    try {
        const response = await axios.post(
            'https://slack.com/api/chat.postMessage',
            { channel, text },
            { headers: { Authorization: `Bearer ${process.env.SLACK_TOKEN}` } }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fix: Ensure response always returns an array
router.get('/messages', async (req, res) => {
    try {
        const response = await axios.get('https://slack.com/api/conversations.history', {
            params: { channel: process.env.SLACK_CHANNEL_ID, limit: 10 },
            headers: { Authorization: `Bearer ${process.env.SLACK_TOKEN}` }
        });

        console.log(response.data);  // Log the full response to check structure

        if (response.data && Array.isArray(response.data.messages)) {
            res.json({ messages: response.data.messages });
        } else {
            res.json({ messages: [] }); // Return empty array if no messages
        }
    } catch (error) {
        console.error(error);  // Log error for debugging
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

export default router;
