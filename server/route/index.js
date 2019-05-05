import userController from '../controller/user';

const route = (app) => {
  app.get('/api/v1/user', userController.list);
  app.post('/auth/v1/signup', userController.create);
}

export default route;
