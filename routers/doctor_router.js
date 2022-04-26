const router = require('express').Router();
const doctorController = require('../controllers/doctor_controller');

router.get('/', doctorController.getDoctors);
router.get('/:doctorId', doctorController.getDoctorById);

router.post('/', doctorController.addDoctor);

module.exports = router;