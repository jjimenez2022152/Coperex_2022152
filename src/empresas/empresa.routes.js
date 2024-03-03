import { Router } from "express";
import { check } from "express-validator";
import {
    empresaPost,
    companyGet,
    empresaGetZA,
    empresasGetAZ,
    empresasGetAMen,
    empresasGetAMas,
    generarExcelReporte
} from "./empresa.controller.js";
import {
    existenteEmail,
    esRoleValido,
    existeNombreEmpresa,
    existeCorreoEmpresa
} from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";


const router = Router();

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").custom(existeNombreEmpresa).not().isEmpty(),
        check("impacto","El impacto de la empresa es obligatorio").not().isEmpty(),
        check("años", "Los años de trayectoria son obligatorios").not().isEmpty(),
        check("telefono", "El telefono debe ser mayor a 8 caracteres").isLength({
            min: 8,
        }),
        check("categoria", "La categoria es obligatoria").not().isEmpty(),
        check("correo", "Este no es un correo valido").custom(existeCorreoEmpresa).isEmail(),
        validarCampos,
    ],
    empresaPost
);

router.get("/", companyGet);


router.get("/empresasAZ", empresaGetZA);
router.get("/empresasZA", empresasGetAZ);
router.get("/empresasMem", empresasGetAMen);
router.get("/empresasMas", empresasGetAMas);

router.get("/reportExcel", generarExcelReporte);

export default router;