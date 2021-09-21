const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        //variables
        this.app = express();
        this.port = process.env.PORT;

        //Path de las rutas
        this.authPath = '/api/auth';
        this.userPath = '/api/users';

        //Conexion a la base de datos
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async connectDB(){
        //Conexion con MongoDB
        await dbConnection();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //Json body
        this.app.use(express.json());
        //Archivos estaticos
        this.app.use(express.static('public'));
        //Acepta informacion que viene del Frontend
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(){
        //Rutas
        this.app.use(this.authPath, require('./../routes/auth'));
        this.app.use(this.userPath, require('./../routes/users'));
    }

    listen(){
        //Servidor a la escucha
        this.app.listen(this.port, () => {
            console.log('Server on port:', this.port);
        });
    }
}

module.exports = Server;