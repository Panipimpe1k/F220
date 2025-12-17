const express = require('express');
const router = express.Router();
const candlesController = require('../controllers/candlesControllers');

router.get('/', candlesController.getAll);
router.get('/add', candlesController.getAddForm);
router.post('/add', candlesController.postAdd);
router.get('/view/:id', candlesController.getOne);
router.get('/edit/:id', candlesController.getEditForm);
router.post('/edit/:id', candlesController.postEdit);
router.post('/delete/:id', candlesController.deleteCandle);

module.exports = router;