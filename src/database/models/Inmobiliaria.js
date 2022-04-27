const { dirname } = require("path");

module.exports = (sequelize, dataTypes) => {
    let alias ="Inmobiliarias";
    let columns = {
        id:{
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        email:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        password:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        nombre_inmobiliaria:{
            type: dataTypes.STRING,
            allowNull: false,
        },
        logo:{
            type: dataTypes.STRING,
            allowNull: true,
        },
    };
    const config = {
        tableName : "inmobiliarias",
        timestamps : true, //createdAt/updatedAt
        paranoid: true //soft delete
    }   
    const Inmobiliaria = sequelize.define(alias,columns,config);
    Inmobiliaria.associate = (models) =>{
        Inmobiliaria.hasMany(models.Calificaciones,{
            as:'calificaciones',
            foreignKey: 'inmobiliaria_id' 
        })
       
    }
    return Inmobiliaria;
}

//minuto 20 Pablo