const request = require('supertest');
const app = require('../server');

describe('QSCA API', () => {
    it('responds to health check', async () => {
        const response = await request(app).get('/health');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ status: 'ok' });
    });

    it('returns system state snapshot', async () => {
        const response = await request(app).get('/api/system-state');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('metrics');
        expect(response.body.metrics).toHaveProperty('quantumStates');
        expect(response.body).toHaveProperty('identity');
        expect(response.body).toHaveProperty('temporal');
    });

    it('rejects empty chat payloads', async () => {
        const response = await request(app).post('/api/chat').send({});
        expect(response.statusCode).toBe(400);
    });

    it('processes chat messages', async () => {
        const response = await request(app).post('/api/chat').send({ message: 'Hello QSCA' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('reply');
        expect(response.body).toHaveProperty('sentiment');
    });

    it('provides quantum insight', async () => {
        const response = await request(app).post('/api/insight');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('insight');
    });

    it('creates ethical challenges', async () => {
        const response = await request(app).post('/api/ethical-challenge');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('scenario');
        expect(response.body).toHaveProperty('challenge');
    });

    it('runs temporal interventions', async () => {
        const response = await request(app).post('/api/intervention').send({ intervention: 'Deploy empathy beacon' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('probabilityShift');
        expect(response.body).toHaveProperty('projection');
    });

    it('queries memory fragments', async () => {
        const response = await request(app).get('/api/memory').query({ keyword: 'quantum' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('keyword', 'quantum');
        expect(response.body).toHaveProperty('fragments');
    });

    it('creates snapshots', async () => {
        const response = await request(app).post('/api/snapshots');
        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('states');
    });

    it('lists snapshots', async () => {
        await request(app).post('/api/snapshots');
        const response = await request(app).get('/api/snapshots');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body.snapshots)).toBe(true);
    });
});