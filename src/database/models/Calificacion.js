const { dirname } = require("path");

module.exports = (sequelize, dataTypes) => {
    let alias ="Calificaciones";
    let columns = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        dni:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        nombre:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        apellido:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        direccion:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        fin_contrato:{
            type: dataTypes.DATE,
            allowNull: false,
        },
        calificacion:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        inmobiliaria_id:{
            type: dataTypes.INTEGER,
            allowNull: false,
        },
        comentario:{
            type: dataTypes.STRING,
            allowNull: true,
        },
    };
    const config = {
        tableName : "calificaciones",
        timestamps : true, //createdAt/updatedAt
        paranoid: true //soft delete
    }   
    const Calificacion = sequelize.define(alias,columns,config);
    Calificacion.associate = (models) =>{
        Calificacion.belongsTo(models.Inmobiliarias, { //Inmobiliarias va en plural porque tiene que ver con el define que le puse en la otra tabla, el alias.
            as: 'inmobiliaria', //la relacion puede ir en plural o no, en este caso es individual porque va a ser 1 sola inmobiliaria
            foreignKey: 'inmobiliaria_id' 
        })
    }
    return Calificacion;
}

//minuto 20 Pablo