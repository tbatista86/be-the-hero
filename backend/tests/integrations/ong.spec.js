const request = require('supertest');
const app = require('../../src/app');
const conennection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await conennection.migrate.rollback();
        await conennection.migrate.latest();
    });

    afterAll(async () => {
       await conennection.destroy();
    });

    it('Shoud be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "apad2@apda2.com.br",
                whatsapp: "14998745632",
                city: "Chavantes",
                uf: "SP"
            });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });
});