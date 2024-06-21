
const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

router.get('/', async (req, res) => {
    const category = req.query.category;
    if(category === 'all'){
        const boards = await prisma.board.findMany();
        res.json(boards);
    } else if (category === 'recent') {
        const boards = await prisma.board.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        res.json(boards);
    }else if (category) {
        const boards = await prisma.board.findMany({
          where: {
            category: {
                contains: category,
                mode: 'insensitive'
            }
          }
        });
        res.json(boards);
    } else {
        const boards = await prisma.board.findMany();
        res.json(boards);
    }
})

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const board = await prisma.board.findUnique({
        where:{
            id
        }
    })
    res.json(board);
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
