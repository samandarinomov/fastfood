const { Router } = require('express');
const router = Router();

const { create, update, remove, show } = require('../controllers/category.controller');
const { isAdmin } = require('../middlewares/is-admin.middleware');

router.get('/category', show);
router.post('/category', isAdmin, create);
router.put('/category/:id', isAdmin, update);
router.delete('/category/:id', isAdmin, remove);

module.exports = router;