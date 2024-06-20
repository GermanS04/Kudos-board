const express = require('express'), router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

router.get('/', async (req, res) => {
    const cards = await prisma.card.findMany();
    res.json(cards)
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const cards = await prisma.card.findMany({
        where: {
            boardId: id
        }
    })
    res.json(cards)
})

router.post('/', async (req, res) => {
    const {title, description, owner, boardId} = req.body;
    const cards = await prisma.card.create({
        data: {
            title,
            description,
            owner,
            boardId
        }
    })
    res.json(cards);
})

router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const cards = await prisma.card.delete({
        where: {
            id
        }
    })
    res.json(cards);
})



module.exports = router;
