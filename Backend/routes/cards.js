const express = require('express'), router = express.Router();

router.use('/', (req, res, next) => {
    next();
})



module.exports = router;
