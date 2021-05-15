import Joi from "joi-browser";

export const validate = (validateObj, schema) => {
  const { error } = Joi.validate(validateObj, schema, { abortEarly: false });
  if (!error) return null;

  const errors = {};
  error.details.map((error) => (errors[error.path[0]] = error.message));

  return errors;
};

export const validateProperty = (schema, name, value) => {
  const obj = { [name]: value };
  const schemaProperty = { [name]: schema[name] };

  const { error } = Joi.validate(obj, schemaProperty, { abortEarly: false });

  return error ? error.details[0].message : null;
};
