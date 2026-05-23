const dataModel = require('../models/dataModel');

exports.getSystemState = (req, res, next) => {
    try {
        res.json(dataModel.getSystemState());
    } catch (error) {
        next(error);
    }
};

exports.processChat = (req, res, next) => {
    const message = req.body?.message;
    if (!message || typeof message !== 'string' || !message.trim()) {
        return res.status(400).json({ error: 'Message is required' });
    }
    try {
        res.json(dataModel.processChatMessage(message));
    } catch (error) {
        next(error);
    }
};

exports.generateInsight = (req, res, next) => {
    try {
        res.json(dataModel.generateInsight());
    } catch (error) {
        next(error);
    }
};

exports.generateEthicalChallenge = (req, res, next) => {
    try {
        res.json(dataModel.generateEthicalChallenge());
    } catch (error) {
        next(error);
    }
};

exports.simulateIntervention = (req, res, next) => {
    const intervention = req.body?.intervention;
    if (!intervention || typeof intervention !== 'string' || !intervention.trim()) {
        return res.status(400).json({ error: 'Intervention is required' });
    }
    try {
        res.json(dataModel.runTemporalIntervention(intervention.trim()));
    } catch (error) {
        next(error);
    }
};

exports.queryMemory = (req, res, next) => {
    const keyword = req.query?.keyword;
    if (!keyword || typeof keyword !== 'string' || !keyword.trim()) {
        return res.status(400).json({ error: 'Keyword is required' });
    }
    try {
        res.json(dataModel.queryMemory(keyword.trim()));
    } catch (error) {
        next(error);
    }
};

exports.createSnapshot = (req, res, next) => {
    try {
        const snapshot = dataModel.createSnapshot();
        res.status(201).json(snapshot);
    } catch (error) {
        next(error);
    }
};

exports.listSnapshots = (req, res, next) => {
    try {
        res.json({ snapshots: dataModel.listSnapshots() });
    } catch (error) {
        next(error);
    }
};