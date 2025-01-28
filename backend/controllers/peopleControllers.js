import db from "../db/db.js";
import { fn, col, literal } from "sequelize";
const {tables} = db;
const {usuarios} = tables;

export const getPeople = async(req, res) => {

    const getPersonsAlphabetically = await usuarios.findAll({
        where: {
            estado: 1
        },
        order: [
            ["nombre", "ASC"]
        ]
    });
    try {
        res.status(200).json({
            status: 200,
            message: "Listado de personas",
            result: getPersonsAlphabetically
        });

    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: "Error al traer los usuario",
        });
    }
    
}

export const createPerson = async(req, res) => {
   try {
     const {nombre, apellido, email} = req.body;

     const checkPersonExists = await usuarios.findOne({
        where: {
            email: email
        },
        attributes: ["email"]
     });

     if (checkPersonExists){
        return res.status(409).json({
            status: 409,
            message: "El correo ya existe"
        });
     }

     const person = await usuarios.create({
        nombre,
        apellido,
        email
        });

     return res.status(201).json({
        status: 201,
        message: "Persona creada con exito",
        //result: person
     });
   } catch (error) {
    console.log(error);
    return res.status(404).json({
        status: 404,
        message: "Error al crear usuario",
    });
   }
};

export const updatePerson = async(req, res) => {

    const {id, nombre, apellido, email} = req.body;

try {

    const user = await usuarios.findOne({
        where: {
        id,
        estado: 1
    },
    attributes: ["id", "email"]
    });

    if (!user) {
        return res.status(404).json({
            status: 404,
            message: "No se encontro a la persona, porfavor reinicia la pagina"
        })
    };

    const checkEmail = await usuarios.findOne({
        where: {
            email
        },
        attributes: ["email"]
    });
    
    if (!checkEmail) {
        console.log("usuario actualizado porque se cambio el correo");
        
        await user.update({nombre, apellido, email});
        return res.status(200).json({
            status: 200,
            message: "Persona actualizada con exito",
        });
    };

    if (checkEmail.dataValues.email === user.dataValues.email) {
        return res.status(200).json({
            status: 200,
            message: "Persona actualizada con exito",
        });
   
    }

    return res.status(200).json({
        status: 200,
        message: "El correa ya existe ",
        });

} catch (error) {
    console.log(error)
    return res.status(404).json({
        status: 404,
        message: "Error al crear actualizar el usuario",
    }); 
}
};

export const deletePerson = async(req, res) => {
    try {
        const {id} = req.body;
        const user = await usuarios.findOne({
            where: {
            id,
            estado: 1
            },
            attributes: ["id", "nombre", "apellido", "email"]
        })

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Hubo un error con la eliminacion de la persona, reinicia la aplicacion",
        });
        };
        await user.update({estado: 0});        
        return res.status(200).json({
            status: 200,
            message: "Persona eliminada con exito",
            result: user.dataValues
        });

    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: "Error al crear borrar el usuario",
        });
    }
};
