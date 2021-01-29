import { Router } from 'express';
const route = Router();

import * as homeController from '../controller/homeController';

route.get('/', homeController.home);

export default route;
