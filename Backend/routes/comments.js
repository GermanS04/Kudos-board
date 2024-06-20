const express = require('express'), router = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

router.get('/:id', async (req, res) => {
    const cardId = parseInt(req.params.id);
    const comments = await prisma.comment.findMany({
        where: {
            cardId
        }
    })
    res.json(comments);
})

router.post('/', async (req, res) => {
    const { author, content, cardId, userId } = req.body;
    const comments = await prisma.comment.create({
        data: {
            author,
            content,
            cardId,
            userId
        }
    })
    res.json(comments)
})



module.exports = router;
