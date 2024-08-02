const { Router } = require('express');
const router = Router();

const { create, remove, show } = require('../controllers/order.controller');
const { isAuth } = require('../middlewares/is-auth.middleware');

router.get('/order', isAuth, show);
router.post('/order', isAuth, create);
router.delete('/order/:id', isAuth, remove);

module.exports = router;