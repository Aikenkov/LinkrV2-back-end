import joi from "joi";

const postCommentSchema = joi.object({
    text: joi.string().max(255).min(1),
});

export { postCommentSchema };
