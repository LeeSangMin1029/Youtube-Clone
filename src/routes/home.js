import { Router } from 'express';

import * as homeController from '../controller/home-controller';
import { verifyToken } from '../loaders/middlewares';

const route = Router();
route.get('/', verifyToken, homeController.renderMain);

export default route;
