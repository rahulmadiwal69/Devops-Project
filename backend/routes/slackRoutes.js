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

// ✅ Ensure default export
export default router;
