const request = require('supertest');
const app = require('../../api');
const jwt = require('jsonwebtoken');
const allPosts = require('../assets/allPosts.json');
const resetDatabase = require('../assets/resetDataBase');

describe('Testes  no endpoint < /post > ', () => {
  const jwtSpy = jest.spyOn(jwt, 'verify');
  jwtSpy.mockReturnValue({ email: 'lewishamilton@gmail.com' });

  const token = 'simulaMinhaChaveToken';

  beforeAll(async () => {
    resetDatabase();
  });

  describe('Testes em /post no metodo < GET >', () => {
    it('Testa se retorna todas os posts', async () => {
      const response = await request(app).get('/post').set({ authorization: token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(allPosts);
    });

    it('Testa se retorna apenas um post', async () => {
      const response = await request(app).get('/post/1').set({ authorization: token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(allPosts[0]);
    });

    it('Testa se retorna um post com o termo buscado', async () => {
      const response = await request(app)
        .get('/post/search?q=vamos')
        .set({ authorization: token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual([allPosts[1]]);
    });

    // it('Testa se passar um token invalido retorna code 401 e uma mensagem de erro', async () => {
    //   beforeEach(() => {
    //     jwtSpy.clearAllMocks();
    //   });
    //   const response = await request(app).get('/post').set({ authorization: token });
    //   expect(response.status).toBe(401);
    //   expect(response.body).toEqual({ message: 'Expired or invalid token' });
    // });
  });

  describe('Testes em /post no metodo < POST >', () => {
    it('Testa se é possivel registrar um post com sucesso', async () => {
      const response = await request(app)
        .post('/post')
        .set({ authorization: token })
        .send({
          title: 'Latest updates, August 1st',
          content: 'The whole text for the blog post goes here in this key',
          categoryIds: [1, 2],
        });
      expect(response.status).toBe(201);
      expect(response.body).toEqual({
        id: 3,
        title: 'Latest updates, August 1st',
        content: 'The whole text for the blog post goes here in this key',
        userId: 1,
      });
    });
    describe('Testa tratamento de erros em /post no metodo < POST >', () => {
      it('Testa se não passar todas as informações recebe code 400 e uma mensagem de erro ', async () => {
        const response = await request(app)
          .post('/post')
          .set({ authorization: token })
          .send({
            title: 'Latest updates, August 1st',
            content: 'The whole text for the blog post goes here in this key',
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: 'Some required fields are missing' });
      });
      it('Testa se não passar pelo menos uma categoria existente recebe code 400 e uma mensagem de erro ', async () => {
        const response = await request(app)
          .post('/post')
          .set({ authorization: token })
          .send({
            title: 'Latest updates, August 1st',
            content: 'The whole text for the blog post goes here in this key',
            categoryIds: [98, 97],
          });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({ message: '"categoryIds" not found' });
      });
    });
    describe('Testes em /post no metodo < DELETE >', () => {
      it('Testa se é possivel deletar um post', async () => {
        const response = await request(app)
          .delete('/post/1')
          .set({ authorization: token });
        expect(response.status).toBe(204);
      });
    });
    describe('Testes em /post no metodo < PUT >', () => {
      it('Testa se é possivel editar um post com sucesso', async () => {
        const response = await request(app)
          .put('/post/2')
          .set({ authorization: token })
          .send({
            title: 'Batatinha 5, August 1st',
            content: 'The whole text for the blog post goes here in this key',
          });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
          id: 2,
          title: 'Batatinha 5, August 1st',
          content: 'The whole text for the blog post goes here in this key',
          userId: 1,
          published: '2011-08-01T19:58:00.000Z',
          updated: '2011-08-01T19:58:51.000Z',
          user: {
            id: 1,
            displayName: 'Lewis Hamilton',
            email: 'lewishamilton@gmail.com',
            image:
              'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
          },
          categories: [
            {
              id: 2,
              name: 'Escola',
            },
          ],
        });
      });
    });
  });
});
