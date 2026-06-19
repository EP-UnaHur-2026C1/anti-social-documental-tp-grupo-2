// Por defecto nuestro middleware de validación de esquemas asume que el esquema se encuentra en el body de la petición, pero también puede validar parámetros de query params si se le indica el source (fuente) correspondiente.

const validateSchema = (schema, source = "body") => (req, res, next) => {
  const { error } = schema.validate(req[source], { abortEarly: false });
  if (error) {
    return res.status(400).json({
      error: "Validation error",
      details: error.details.map((d) => d.message),
    });
  }
  next();
};

module.exports = validateSchema;
