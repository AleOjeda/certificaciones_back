//Modulos
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
/////HABILITAR CORS... Cuidado en producción. Colocar antes de las rutas de APIS/////
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}) 
/////HABILITAR CORS... Cuidado en producción/////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


//Rutas APIs
const apiUsersRouter = require('./routes/API/usersRouter');


//**quito el /api para luego en el nginx poder utilizar el location /api y que llame directo a /ser en vez de tener que poner doble /api/api en react. **/
// sin nginx
// app.use('/api/user', apiUsersRouter);
// con nginx
//app.use('/user', apiUsersRouter);

app.use('/api/user', apiUsersRouter);


//Iniciando en puerto 3001 y heroku.
app.listen(process.env.PORT || 3001, () => {
    console.log('Corriendo en puerto 3001');
    console.log('////');
    console.log('http://localhost:3001');
});