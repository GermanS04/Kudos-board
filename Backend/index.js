
const { PrismaClient } = require('@prisma/client');

const express = require('express');
const app = express();
const PORT = 3000;
const prisma = new PrismaClient();

app.use(express.json());

const boardsRoute = require('./routes/boards');
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const commentsRoute = require('./routes/comments');

app.get("/", (req, res, next) => {
    res.send('Kudoboard API');
    next();
})

app.get('/boards', boardsRoute);


app.listen(PORT, () => {
    console.log(`Running API on localhost ${PORT}`)
})
