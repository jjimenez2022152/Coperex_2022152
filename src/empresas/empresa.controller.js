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

export const empresasGetAZ = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort({ nombre: 1 }) // Ordenar por nombre en orden ascendente (A-Z)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            empresas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al listar empresas'
        });
    }
};

export const empresasGetZA = async (req, res) => {
    const { limite = 10, desde = 0 } = req.query;
    const query = { estado: true };

    try {
        const [total, empresas] = await Promise.all([
            Empresa.countDocuments(query),
            Empresa.find(query)
                .sort({ nombre: -1 }) // Ordenar por nombre en orden descendente (Z-A)
                .skip(Number(desde))
                .limit(Number(limite))
        ]);

        res.status(200).json({
            total,
            empresas
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al listar empresas'
        });
    }
};
