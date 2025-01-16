const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth_middleware');

// Import controllers
const loginController = require('../controllers/auth/login_controller');

const ticketController = require('../controllers/ticket_controller');
const memberController = require('../controllers/member_controller');
const userController = require('../controllers/user_controller');
const deviceController = require('../controllers/device_controller');

const turnstileController = require('../controllers/turnstile_controller');

// Auth routes
router.post('/login', loginController.login);

// Routes
router.post("/check-token", authMiddleware, loginController.checkToken);

router.get('/tickets', authMiddleware, ticketController.get);
router.post('/tickets', authMiddleware, ticketController.store);

router.get('/devices', authMiddleware, deviceController.get);
router.get('/devices/:id', authMiddleware, deviceController.show);
router.get('/devices/status/change', authMiddleware, deviceController.change_status);
router.post('/devices', authMiddleware, deviceController.store);
router.put('/devices/:id', authMiddleware, deviceController.update);
router.delete('/devices/:id', authMiddleware, deviceController.destroy);

router.get('/members', authMiddleware, memberController.get);
router.get('/members/:id', authMiddleware, memberController.show);
router.get('/members/check/member', authMiddleware, memberController.check_member);
router.get('/members/status/change', authMiddleware, memberController.change_status);
router.post('/members', authMiddleware, memberController.store);
router.put('/members/:id', authMiddleware, memberController.update);
router.delete('/members/:id', authMiddleware, memberController.destroy);

router.get('/users', authMiddleware, userController.get);
router.get('/users/:id', authMiddleware, userController.show);
router.post('/users', authMiddleware, userController.store);
router.put('/users/:id', authMiddleware, userController.update);
router.delete('/users/:id', authMiddleware, userController.destroy);

router.get('/ticket/check', turnstileController.open_gate);

module.exports = router;