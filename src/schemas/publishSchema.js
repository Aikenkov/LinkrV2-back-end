import joi from "joi";

const publishSchema = joi.object({
    text: joi.string().max(255).min(0),
    link: joi.string().min(1).required(),
});

export { publishSchema };
