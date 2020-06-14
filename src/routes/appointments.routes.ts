import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.get('/', async (request, response) => {
  try {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentRepository.find();

    return response.json(appointments);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentRouter.post('/', async (request, response) => {
  try {
    const { date, provider_id } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    const newAppointment = await createAppointmentService.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(newAppointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
