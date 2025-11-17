const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api.controller');

router.get('/info', apiController.getInfo);

module.exports = router;

