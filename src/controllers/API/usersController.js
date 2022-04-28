require('dotenv').config()

const db = require('../../database/models');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const path = require('path')
const fs=require('fs');

const { v4: uuidv4 } = require('uuid');

// tslint:disable-next-line: no-var-requires

const JWT_TOKEN = process.env.JWT_TOKEN;


module.exports = {
    create_record: (req,res) =>{
        db.Calificaciones.create({
            dni: req.body.dni,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            direccion: req.body.direccion,
            fin_contrato: req.body.fin_contrato,
            calificacion: req.body.calificacion,
            inmobiliaria_id: req.body.inmobiliaria_id,
            comentario: req.body.comentario
        })
        .then(newRecord => res.status(200).json(
                {
                    info: "Nueva calificación registrada",
                    data: newRecord
                }
            ))
        .catch(err => res.status(400).json(
            {
                info: "Surgió un error",
                data: err
            }
        ))
    },

    ///
    // const respuestaJson = [
    //     {
    //         "dni": "16.134.279",
    //         "nombre": "Paula",
    //         "apellido": "Bustamante",
    //         "calificacionProm": "1",
    //         "calificacionesHistorico":[
    //             {
    //                 "direccion": "Av. Amenedo 785, Adrogué",
    //                 "fin_contrato": "22/01/2022",
    //                 "calificacion": "1",
    //                 "inmobiliaria": "Inmobiliaria Demo",
    //                 "comentarios": "No la recomiendo, se va con deudas",
    //             },
    //             {
    //                 "direccion": "Av. Amenedo 785, Adrogué",
    //                 "fin_contrato": "17/03/2020",
    //                 "calificacion": "2",
    //                 "inmobiliaria": "Inmobiliaria Demo",
    //                 "comentarios": "Cuesta cobrar pero paga",
    //             }
    //         ]
    // },
    // {
    //         "dni": "40.127.244",
    //         "nombre": "Marcos",
    //         "apellido": "Latorre",
    //         "calificacionProm": "5",
    //         "calificacionesHistorico":[{
    //             "direccion": "La prida 1852, Lomas de Zamora",
    //             "fin_contrato": "10/02/2019",
    //             "calificacion": "5",
    //             "inmobiliaria": "Inmobiliaria Demo",
    //             "comentarios": "Excelente inquilino, lo recomendaria. Buen pagador, mantiene la propiedad",
    //         }]
    // },]
    ///
    view_records_per_rsid: (req,res) =>{
        db.Calificaciones.findAll({
            where:{
                inmobiliaria_id : req.body.inmobiliaria_id
            },
            include: [
                { association : 'inmobiliaria'}
            ]
        })
        .then (registros => {
            inquilinosUnicos = registros.filter( (element,index) =>{
                return registros.indexOf(registros.find(elementArray => elementArray.dni == element.dni)) == index
            } )
            calcularCalificacionProm = (inquilino) => {
                // calificacionesHistocias = registros.reduce((previousValue,currentValue),initialValue);
                const arrayCalificaciones = registros.reduce((previousValue,currentValue)=>{
                    if(currentValue.dni == inquilino.dni){
                        previousValue.push(currentValue.calificacion)
                    }
                    return previousValue
                },[]);
                const calificacionPromedio = arrayCalificaciones.reduce((previousValue,currentValue)=> previousValue+currentValue)/arrayCalificaciones.length
                return calificacionPromedio
            }

            historicoPorDni= inquilinosUnicos.map( inquilino => {
                return registros.filter(element => element.dni == inquilino.dni)
            })
            respuestaDef = inquilinosUnicos.map( inquilino => {
                arrayrespuesta = {
                    dni: inquilino.dni,
                    nombre: inquilino.nombre,
                    apellido: inquilino.apellido,
                    calificacionPromedio: calcularCalificacionProm(inquilino),
                    calificacionesHistorico: registros.filter(element => element.dni == inquilino.dni)
                }
                return arrayrespuesta
            })

            res.status(200).json({
            info: "Se incluyen registros de la inmobiliaria indicada",
            data: respuestaDef,
            })
        }
        )
    },
    view_all_records: (req,res) =>{
        db.Calificaciones.findAll({
            include: [
                { association : 'inmobiliaria'}
            ]
        })
        .then (registros => {
            inquilinosUnicos = registros.filter( (element,index) =>{
                return registros.indexOf(registros.find(elementArray => elementArray.dni == element.dni)) == index
            } )
            calcularCalificacionProm = (inquilino) => {
                // calificacionesHistocias = registros.reduce((previousValue,currentValue),initialValue);
                const arrayCalificaciones = registros.reduce((previousValue,currentValue)=>{
                    if(currentValue.dni == inquilino.dni){
                        previousValue.push(currentValue.calificacion)
                    }
                    return previousValue
                },[]);
                const calificacionPromedio = arrayCalificaciones.reduce((previousValue,currentValue)=> previousValue+currentValue)/arrayCalificaciones.length
                return calificacionPromedio
            }

            historicoPorDni= inquilinosUnicos.map( inquilino => {
                return registros.filter(element => element.dni == inquilino.dni)
            })
            respuestaDef = inquilinosUnicos.map( inquilino => {
                arrayrespuesta = {
                    dni: inquilino.dni,
                    nombre: inquilino.nombre,
                    apellido: inquilino.apellido,
                    calificacionPromedio: calcularCalificacionProm(inquilino),
                    calificacionesHistorico: registros.filter(element => element.dni == inquilino.dni)
                }
                return arrayrespuesta
            })
            res.status(200).json({
            info: "Se incluyen registros de todas las inmobiliarias",
            data: respuestaDef,
            })
        }
        )
    },
    testGET: (req,res) =>{
        db.Calificaciones.findAll({
            where:{
                inmobiliaria_id : req.body.inmobiliaria_id
            },
            include: [
                { association : 'inmobiliaria'}
            ]
        })
        .then (registros => res.status(200).json({
            info: "Se incluyen registros de la inmobiliaria indicada",
            data: registros
        }))
    },
    
    testPOST: (req,res) =>{
        db.Calificaciones.findAll({
            include: [
                { association : 'inmobiliaria'}
            ]
        })
        .then (registros => {
            inquilinosUnicos = registros.filter( (element,index) =>{
                return registros.indexOf(registros.find(elementArray => elementArray.dni == element.dni)) == index
            } )
            calcularCalificacionProm = (inquilino) => {
                // calificacionesHistocias = registros.reduce((previousValue,currentValue),initialValue);
                const arrayCalificaciones = registros.reduce((previousValue,currentValue)=>{
                    if(currentValue.dni == inquilino.dni){
                        previousValue.push(currentValue.calificacion)
                    }
                    return previousValue
                },[]);
                const calificacionPromedio = arrayCalificaciones.reduce((previousValue,currentValue)=> previousValue+currentValue)/arrayCalificaciones.length
                return calificacionPromedio
            }

            historicoPorDni= inquilinosUnicos.map( inquilino => {
                return registros.filter(element => element.dni == inquilino.dni)
            })
            respuestaDef = inquilinosUnicos.map( inquilino => {
                arrayrespuesta = {
                    dni: inquilino.dni,
                    nombre: inquilino.nombre,
                    apellido: inquilino.apellido,
                    calificacionPromedio: calcularCalificacionProm(inquilino),
                    historicos: registros.filter(element => element.dni == inquilino.dni)
                }
                return arrayrespuesta
            })

            res.status(200).json({
            info: "Se incluyen registros de todas las inmobiliarias",
            data: respuestaDef,
            })
        }
        )
    },
};