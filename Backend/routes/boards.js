
const express = require('express'), router = express.Router();

router.use('/', (req, res, next) => {
    next();
})

router.get('/boards', (req, res) => {
    res.send('funciona')
})

module.exports = router;
