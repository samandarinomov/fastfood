const { Router } = require('express');
const router = Router();

const { register, verify, login, getUsers } = require('../controllers/auth.controller');
const { isAdmin } = require('../middlewares/is-admin.middleware');

router.post('/auth/register', register);
router.post('/auth/verify', verify);
router.post('/auth/login', login);
router.get('/users', isAdmin, getUsers);

module.exports = router;