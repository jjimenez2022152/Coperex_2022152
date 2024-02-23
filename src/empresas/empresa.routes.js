import { Router } from "express";
import { check } from "express-validator";
import {
    empresaPost
} from "./empresa.controller.js";

import {
    existenteEmail,
    //esRoleValido,
    //existeUsuarioById,
} from "../helpers/db-validators.js";

import { validarCampos } from "../middlewares/validar-campos.js";

const router = Router();

Router.post(
    "/,"
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("impacto","El impacto de la empresa es obligatorio").not().isEmpty(),
        check("años", "Los años de trayectoria son obligatorios").not().isEmpty(),
        check("telefono", "el telefono debe ser mayor o igual de 8 digitos").isLength({min:8}),
        check("categoria", "La categoria es obligatoria").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos
    ],
    empresaPost
);

export default router;