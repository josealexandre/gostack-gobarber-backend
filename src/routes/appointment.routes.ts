import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

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
    const { date, provider } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();
    const newAppointment = await createAppointmentService.execute({
      date: parsedDate,
      provider,
    });

    return response.json(newAppointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointmentRouter;
