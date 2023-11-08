/**
 * Define a orderItem JSON schema.
 */
 exports.orderItemSchema = {
    type: "object",
    required: ["orderItemId", "quantity"],
    properties: {
        orderItemId: {
            type: "string"
        },
        quantity: {
            type: "string"
        }
    }
};