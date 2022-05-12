const router = require('express').Router();
const appointmentController = require('../controllers/appointment_controller');

router.post('/', appointmentController.createAppointment);
router.get('/', appointmentController.getAppointments);
router.post('/makeAppointment', appointmentController.makeAppointment)
router.get('/cancelAppointment', appointmentController.cancelAppointment);

module.exports = router;