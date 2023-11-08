/**
 * Define a user JSON schema.
 */
 exports.createUserSchema = {
    type: "object",
    required: ["username"],
    properties: {
        username: {
            type: "string"
        }
    },
};