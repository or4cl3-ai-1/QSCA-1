const router = require('express').Router();
const controller = require('../controllers/frontendController');

router.get('/system-state', controller.getSystemState);
router.post('/chat', controller.processChat);
router.post('/insight', controller.generateInsight);
router.post('/ethical-challenge', controller.generateEthicalChallenge);
router.post('/intervention', controller.simulateIntervention);
router.get('/memory', controller.queryMemory);
router.post('/snapshots', controller.createSnapshot);
router.get('/snapshots', controller.listSnapshots);

module.exports = router;