import { Router } from 'express';

import * as homeController from '../controller/home-controller';
import { verifyToken, credentials } from '../loaders/middlewares';

const route = Router();
route.get('/', verifyToken, credentials, homeController.renderMain);

export default route;
