const router = require('express').Router();
const departmentController = require('../controllers/department_controller');

router.get('/', departmentController.getDepartments);
router.post('/', departmentController.addDepartment);

module.exports = router;