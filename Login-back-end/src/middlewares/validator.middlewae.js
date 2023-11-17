//utilizacionde las validaciones de zod
export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    // Intenta validar los datos en req.body utilizando el esquema proporcionado.
    next();
    // Si la validación es exitosa, permite que la solicitud continúe al siguiente middleware o controlador.
  } catch (error) {
    return res
      .status(400)
      // .json({ error: error.errors.map((error) => error.message) }); //errors es un objeto dentro de error, esto se utiliza, para ver solo el mensaje, solo los mensajes de los errores
      .json ([ error.errors.map((error) => error.message)])
    // Si la validación falla y se lanza una excepción, responde con un código de estado 400 (Bad Request) y proporciona información sobre el error de validación.
  }
};
