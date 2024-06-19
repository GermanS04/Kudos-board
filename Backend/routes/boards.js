
const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

router.use(cors({
    origin: ['http://localhost:5173']
}))

router.use('/', (req, res, next) => {
    next();
})

router.get('/boards', async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
})

router.post('/boards', async (req, res) => {
    const { title, category, author, cards } = req.body;
    const boards = await prisma.board.create({
        data: {
            title,
            category,
            author,
            cards
        }
    });
    res.json(boards);
})

module.exports = router;
