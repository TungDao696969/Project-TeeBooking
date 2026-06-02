import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestData = {
        body: req.body,
        query: req.query,
        params: req.params,
      };

      const shape = (schema as any).shape;
      const validatesRequestData =
        shape &&
        ["body", "query", "params"].some((key) =>
          Object.prototype.hasOwnProperty.call(shape, key),
        );

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
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: error.issues ?? error.errors,
      });
    }
  };
