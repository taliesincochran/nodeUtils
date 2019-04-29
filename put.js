
const express = require('express');
const router = express.Router();

router.get('/put', (res, req) => {
    res.sendStatus(200)
});

router.get('/put', (res, req) => {
    res.sendStatus(200)
});

router.get('*', (req, res) => {
    res.sendStatus(404);
});
module.exports = router;
