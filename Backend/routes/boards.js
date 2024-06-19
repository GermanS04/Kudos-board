
const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cors = require('cors');

router.use('/', (req, res, next) => {
    next();
})

router.get('/', async (req, res) => {
    const boards = await prisma.board.findMany();
    res.json(boards);
})

router.post('/', async (req, res) => {
    const { title, category, author, cards, imageURL } = req.body;
    const boards = await prisma.board.create({
        data: {
            title,
            category,
            author,
            cards,
            imageURL
        }
    });
    res.json(boards);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const board = await prisma.board.delete({
        where: {
            id
        }
    })
    res.json(board);
})

module.exports = router;
