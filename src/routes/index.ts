import { Router } from 'express';
import appointmentRouter from './appointment.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);

export default routes;
