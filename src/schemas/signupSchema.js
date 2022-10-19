import joi from 'joi';

const registerSchema = joi.object({ 
    username: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email({ minDomainSegments: 2, tlds:{allow: ['com','net'] }}).required(),
    url: joi.string().uri().required()
});

export {
    registerSchema
}