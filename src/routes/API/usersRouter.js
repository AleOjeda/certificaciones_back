const express = require('express');
const router = express.Router();
const controller = require('../../controllers/API/usersController');
//Middleware de chequeo de usuario
//const tokenMiddleware = require('../../middlewares/tokenMiddleware')
//Listar todos los usuarios localhost/api/user/
/* router.get('/', controller.showAll);
router.get('/misPedidos', controller.misPedidos);
 */

/////////ENVIADOR
router.get('/test', controller.testGET);
// router.post('/testPOST', tokenMiddleware, controller.testPOST);

//CRUD
//////Crear calificación
router.post('/create_record', controller.create_record);
router.post('/view_records_per_rsid', controller.view_records_per_rsid);
router.post('/view_all_records', controller.view_all_records);



//Test 
router.get('/testget', controller.testGET);
router.post('/testpost', controller.testPOST);
module.exports = router;