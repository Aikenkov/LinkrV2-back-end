import joi from "joi";

const postCommentSchema = joi.object({
    post_id: joi.number().min(1).greater(0).required(),
    text: joi.string().max(255).min(1).required(),
});

export { postCommentSchema };
