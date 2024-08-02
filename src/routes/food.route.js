const { Router } = require('express');
const router = Router();

const { create, update, remove, show } = require('../controllers/food.controller');
const { isAdmin } = require('../middlewares/is-admin.middleware');

router.get('/food', show);
router.post('/food', isAdmin, create);
router.put('/food/:id', isAdmin, update);
router.delete('/food/:id', isAdmin, remove);

module.exports = router;