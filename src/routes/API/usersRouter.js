const express = require('express');
const router = express.Router();
//const controller = require('../../controllers/API/usersController');
//Middleware de chequeo de usuario
//const tokenMiddleware = require('../../middlewares/tokenMiddleware')
//Listar todos los usuarios localhost/api/user/
/* router.get('/', controller.showAll);
router.get('/misPedidos', controller.misPedidos);
 */

/////////ENVIADOR
router.get('/test', console.log("hola"));
// router.get('/test', controller.testGET);
// router.post('/testPOST', tokenMiddleware, controller.testPOST);


module.exports = router;