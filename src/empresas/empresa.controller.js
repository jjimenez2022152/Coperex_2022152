import { response, request } from 'express'; 
//import bcryptjs from 'bcryptjs';
import Empresa from './empresa.model.js';


export const empresaPost = async (req = request, res = response) => {
    const {nombre, impacto, años, telefono, categoria, correo} = req.body;
    const empresa = new Empresa ({nombre, impacto, años, telefono, categoria, correo});

    await empresa.save();

    res.status(200).json({
        empresa
    });
}