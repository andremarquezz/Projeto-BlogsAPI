const request = require('supertest');
const app = require('../../api');
const jwt = require('jsonwebtoken');
const allUser = require('../assets/allUser.json');
const userServices = require('../../services/userServices');
const resetDatabase = require('../assets/resetDataBase');

describe('Testes no endpoint < /user >', () => {
  const jwtSpy = jest.spyOn(jwt, 'verify');
  jwtSpy.mockReturnValue({ email: 'lewishamilton@gmail.com' });

  const token = 'simulaToken';

  beforeAll(async () => {
    resetDatabase();
  });

  describe('Testes em /user no metodo < POST >', () => {
    it('Testa se é possivel cadastrar um usuario com sucesso', async () => {
      const response = await request(app).post('/user').send({
        displayName: 'Brett COVID',
        email: 'brett@email.com',
        password: '123456',
        image:
          'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
      });
      expect(response.status).toBe(201);
      expect(response.body.token).toBeDefined();
    });
    describe('Testa tratamento de erros no metodo < POST >', () => {
      it('Testa se é o usuario já existir retorna code 409 e uma messagem de erro', async () => {
        const response = await request(app).post('/user').send({
          displayName: 'Michael Schumacher',
          email: 'MichaelSchumacher@gmail.com',
          password: '123456',
          image:
            'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
        });
        expect(response.status).toBe(409);
        expect(response.body).toEqual({
          message: 'User already registered',
        });
      });
      it('Testa se displayName caso tenha menos que 8 caracteres retorna code 400 e uma messagem de erro ', async () => {
        const response = await request(app).post('/user').send({
          displayName: 'Brett',
          email: 'brett@email.com',
          password: '123456',
          image:
            'http://4.bp.blogcom/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: '"displayName" length must be at least 8 characters long',
        });
      });
      it('Testa se não for passado um email valido na chave email retorna code 400 e uma messagem de erro', async () => {
        const response = await request(app).post('/user').send({
          displayName: 'Brett Junior',
          email: 'brettemail.com',
          password: '123456',
          image:
            'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: '"email" must be a valid email',
        });
      });
      it('Testa se não for passado uma senha maior que 6 caracteres retorna code 400 e uma messagem de erro', async () => {
        const response = await request(app).post('/user').send({
          displayName: 'Brett Junior',
          email: 'brett@email.com',
          password: '12345',
          image:
            'http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: '"password" length must be at least 6 characters long',
        });
      });
      it('Testa se não for passado uma chave image retorna code 400 e uma messagem de erro', async () => {
        const response = await request(app).post('/user').send({
          displayName: 'Brett Junior',
          email: 'brett@email.com',
          password: '123456',
        });
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
          message: '"image" is required',
        });
      });
    });
  });
  describe('Testes em /user no metodo < GET >', () => {
    it('Testa se é possivel trazer todos os usuarios com sucesso', async () => {
      const response = await request(app).get('/user').set({ authorization: token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(allUser);
    });
    it('Testa se é possivel trazer apenas um usuario com sucesso', async () => {
      const response = await request(app).get('/user/1').set({ authorization: token });
      expect(response.status).toBe(200);
      expect(response.body).toEqual(allUser[0]);
    });
    it('Testa se é possivel deletar o propio usuario pelo token', async () => {
      const mockServicesDelete = jest.spyOn(userServices, 'deleteUser');
      mockServicesDelete.mockReturnValue(true);
      const response = await request(app)
        .delete('/user/me')
        .set({ authorization: token });
      expect(response.status).toBe(204);
    });
    describe('Testa tratamento de erros no metodo < GET >', () => {
      it('Testa se não passar um token retorna code 401 e uma messagem de erro ', async () => {
        const response = await request(app).get('/user');
        expect(response.status).toBe(401);
        expect(response.body).toEqual({ message: 'Token not found' });
      });
      it('Testa se o id do usuario for invalido retorna code 404 e uma messagem de erro ', async () => {
        const response = await request(app)
          .get('/user/598')
          .set({ authorization: token });
        expect(response.status).toBe(404);
        expect(response.body).toEqual({ message: 'User does not exist' });
      });
    });
  });
});
