const request = require('supertest');
const app = require('../../api');
const allCategories = require('../assets/allCategories.json');
const jwt = require('jsonwebtoken');
const resetDatabase = require('../assets/resetDataBase');

describe('Testes no endpoint < /categories > ', () => {
  const jwtSpy = jest.spyOn(jwt, 'verify');
  jwtSpy.mockReturnValue({ email: 'lewishamilton@gmail.com' });
  const token = 'simulaToken';

  beforeAll(async () => {
    resetDatabase();
  });

  describe('Testes em /categories no metodo < GET >', () => {
    it('Testa se é possivel pegar todas as categorias', async () => {
      const response = await request(app)
        .get('/categories')
        .set({ authorization: token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(allCategories);
    });
  });
  describe('Testes em /categories no metodo < POST >', () => {
    it('Testa se é possivel adicionar uma nova categoria', async () => {
      const response = await request(app)
        .post('/categories')
        .set({ authorization: token })
        .send({
          name: 'Batattinhas',
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 3,
        name: 'Batattinhas',
      });
    });
  });
});
