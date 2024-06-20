
const express = require('express'), router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.use('/', (req, res, next) => {
    next();
})

// TO DO: fix this to case insensitive & use the search here as well
router.get('/', async (req, res) => {
    const categoryLowerCase = req.query.category;
    if(categoryLowerCase === 'all'){
        const boards = await prisma.board.findMany();
        res.json(boards);
    } else if (categoryLowerCase === 'recent') {
        const boards = await prisma.board.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        res.json(boards);
    }else if (categoryLowerCase) {
        const category = categoryLowerCase[0].toUpperCase() + categoryLowerCase.slice(1);
        const boards = await prisma.board.findMany({
          where: {
            category
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
    const cards = await prisma.card.deleteMany({
        where: {
            boardId: id
        }
    })
    const board = await prisma.board.delete({
        where: {
            id
        }
    })
    res.json(board);
})

module.exports = router;
