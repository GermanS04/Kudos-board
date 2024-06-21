const express = require('express'), router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

router.get('/', async (req, res) => {
    const likes = await prisma.like.findMany();
    res.json(likes);
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const likes = await prisma.like.findMany({
        where: {
            cardId: id
        }
    })

    res.json(likes);
})

router.post('/', async (req, res) => {
    const {cardId} = req.body;
    const likes = await prisma.like.create({
        data: {
            cardId
        }
    })

    res.json(likes);
})


module.exports = router;
