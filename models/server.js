const express = require('express');
const cors = require('cors');

class Server {
    constructor(){
        //variables
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        //Json body
        this.app.use(express.json());
        //Archivos estaticos
        this.app.use(express.static('public'));
    }

    routes(){
        //Rutas
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