"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        const requestData = {
            body: req.body,
            query: req.query,
            params: req.params,
        };
        const shape = schema.shape;
        const validatesRequestData = shape &&
            ["body", "query", "params"].some((key) => Object.prototype.hasOwnProperty.call(shape, key));
        const source = validatesRequestData
            ? requestData
            : req.method === "GET"
                ? req.query
                : req.body;
        const sourceSchemaResult = schema.safeParse(source);
        if (sourceSchemaResult.success) {
            return next();
        }
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: sourceSchemaResult.error.issues,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.issues ?? error.errors,
        });
    }
};
exports.validate = validate;
//# sourceMappingURL=validation.middleware.js.map