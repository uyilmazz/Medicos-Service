const router = require('express').Router();
const doctorController = require('../controllers/doctor_controller');

router.get('/', doctorController.getDoctors);
router.get('/:doctorId', doctorController.getDoctorById);
// router.get('/getDoctors', doctorController.getDoctorsBySearchText);

router.post('')
router.post('/', doctorController.addDoctor);

module.exports = router;