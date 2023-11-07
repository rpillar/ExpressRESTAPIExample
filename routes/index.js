const express = require('express');
const router = express.Router();

/* GET default - 'ping' */
router.get('/', function(req, res) {
    res.send({message: "ShopTillYouDrop is ALIVE"}); 
});

module.exports = router;
