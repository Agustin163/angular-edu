const express = require('express');
const router = express.Router();
const controller = require('../controllers/api.controller');

router.get('/info', controller.getInfo);
router.get('/introduccion', controller.getIntroduccion);
router.get('/caracteristicas', controller.getCaracteristicas);
router.get('/ventajas', controller.getVentajas);
router.get('/comandos', controller.getComandos);

module.exports = router;

