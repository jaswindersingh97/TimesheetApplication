const { query } = require('express');
const Joi = require('joi');

const schemas ={
    register: {
        body: Joi.object({
            name: Joi.string().min(3).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            userType: Joi.string().valid('employee','manager').required(),
            }),
        },
    login: {
        body: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(), 
            }),
        },
    addEmployee:{
        body: Joi.object({
            employeeId: Joi.string().required()
        })
    }    
};
module.exports = schemas;