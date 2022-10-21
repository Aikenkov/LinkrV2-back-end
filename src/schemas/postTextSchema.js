import joi from "joi";

const postTextSchema = joi.object({
  text: joi.string().max(255).min(0),
});

export { postTextSchema };
