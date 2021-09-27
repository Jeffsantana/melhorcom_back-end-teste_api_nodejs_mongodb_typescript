import { Router } from 'express'
import { Auth } from '../../../../shared/middlewares/auth';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';

const UserRoutes = Router()

UserRoutes.post('/login', AuthController.login);
UserRoutes.post('/verify-token', AuthController.validate);

UserRoutes.post('/user', Auth, UsersController.create);
UserRoutes.get('/user/:id', Auth, UsersController.read);
UserRoutes.put('/user/:id', Auth, UsersController.update);
UserRoutes.put('/me/:id', Auth, UsersController.upgrade);
UserRoutes.delete('/user/:id', Auth, UsersController.delete);
UserRoutes.get('/user', Auth, UsersController.list);


export default UserRoutes;