import { Router } from "express";
import { check } from "express-validator";
import {
    empresaPost,
    empresasGetAZ,
    empresasGetZA
} from "./empresa.controller.js";
import {
    existenteEmail,
    esRoleValido
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("impacto","El impacto de la empresa es obligatorio").not().isEmpty(),
        check("años", "Los años de trayectoria son obligatorios").not().isEmpty(),
        check("telefono", "El telefono debe ser mayor a 8 caracteres").isLength({
            min: 8,
        }),
        check("categoria", "La categoria es obligatoria").not().isEmpty(),
        check("correo", "Este no es un correo valido").isEmail(),
        check("correo").custom(existenteEmail),
        validarCampos,
    ],
    empresaPost
);

router.get("/", empresasGetAZ);
router.get("/", empresasGetZA);



export default router;