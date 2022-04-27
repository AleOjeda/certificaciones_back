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
 
    testGET: (req,res) =>{
       
    },
    testPOST: (req,res) =>{
       
    },
};