const router = require('express').Router();
const controller = require('../controller/oficinaController');
router.get('/', controller.inicio);
module.exports = router;
