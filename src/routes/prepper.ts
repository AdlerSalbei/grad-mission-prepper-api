import { Router } from 'express';

const router = Router();

router.post('/prepper', (req, res) => {
    // TODO: Add express-validator to make sure body has correct format
    const meh = req.body.meh;
    res.json({ meh: 'lol' });
});

export default router;
