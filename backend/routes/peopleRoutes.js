import { Router } from "express";
import { check } from "express-validator";
import validateDocuments from '../middlewares/validateDocuments.js';

import {createPerson, deletePerson, updatePerson, getPeople  } from "../controllers/peopleControllers.js";

const router = Router();


router.get('/people', getPeople);

router.post('/people',[
    check("nombre").isString().withMessage("El nombre es requerido").bail().notEmpty().withMessage("el nombre es requerido"),
    check("apellido").isString().withMessage("El apellido es requerido").bail().notEmpty().withMessage("El apellido es requerid").bail(),
    check("email").isEmail().withMessage("El email debe ser un correo electronico valido").bail().notEmpty().withMessage("El email debe ser un correo electronico valido").bail(),
    validateDocuments
],createPerson);

router.put('/people',[
    check("nombre").isString().withMessage("El nombre esrequerido").bail().notEmpty().withMessage("el nombre es requerido"),
    check("apellido").isString().withMessage("El apellido es requerido").bail().notEmpty().withMessage("El apellido es requerid").bail(),
    check("email").isEmail().withMessage("El email debe ser un correo electronico valido").bail().notEmpty().withMessage("El email debe ser un correo electronico valido").bail(),
    validateDocuments
],
 updatePerson);

router.delete('/people', deletePerson);

export default router;