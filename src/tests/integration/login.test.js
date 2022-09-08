const request = require('supertest');
const app = require('../../api');
const resetDatabase = require('../assets/resetDataBase');

describe('Testes no endpoint < /login >', () => {
  beforeAll(async () => {
    resetDatabase();
  });

  describe('Testes em /login no metodo < POST >', () => {
    it('Testa se recebe um token quando passado informações de login corretas', async () => {
      const response = await request(app).post('/login').send({
        email: 'lewishamilton@gmail.com',
        password: '123456',
      });
      expect(response.status).toBe(200);
      expect(response.body.token).toBeDefined();
    });
    it('Testa se recebe um code 400 e uma messagem de erro caso falte informação no body', async () => {
      const response = await request(app).post('/login').send({
        email: 'lewishamilton@gmail.com',
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Some required fields are missing' });
    });
    it('Testa se recebe um code 400 e uma messagem de erro caso as informações de login estejam erradas', async () => {
      const response = await request(app).post('/login').send({
        email: 'lewishamilton@gmail.com',
        password: '12345',
      });
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Invalid fields' });
    });
  });
});
