'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js';
import userRoutes from '../src/users/user.routes.js';
import empresaRoutes from '../src/empresas/empresa.routes.js'
//import authRoutes from '../src/auth/auth.routes.js'

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuarioPath = '/coperex_Api/v1/users'
        //this.authPath = '/coffeApi/v1/auth'
        this.empresaPath = '/coperex_Api/v1/empresas'

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use(this.usuarioPath, userRoutes);
        //this.app.use(this.authPath, authRoutes)
        this.app.use(this.empresaPath, empresaRoutes);

        this.app.use(this.empresaPath + '/descendente', empresaRoutes); // Ruta para orden descendente

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;