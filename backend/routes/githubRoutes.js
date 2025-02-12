import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/repos', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.github.com/users/${process.env.GITHUB_USERNAME}/repos`,
            {
                headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` }
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.response?.data || error.message });
    }
});

// ✅ Ensure default export
export default router;
