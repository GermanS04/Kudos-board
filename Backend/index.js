
const { PrismaClient } = require('@prisma/client');

const express = require('express');
const app = express();
const PORT = 3000;
const prisma = new PrismaClient();
const cors = require('cors');


app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const boardsRoute = require('./routes/boards');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const commentsRoute = require('./routes/comments');
const likesRoute = require('./routes/likes')

app.get("/", (req, res, next) => {
    res.send('Kudoboard API');
    next();
})

app.use('/boards', boardsRoute);
app.use('/cards', cardsRoute);
app.use('/likes', likesRoute);
app.use('/comments', commentsRoute);


app.listen(PORT, () => {
    console.log(`Running API on localhost ${PORT}`)
})
