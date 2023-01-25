import { Button, darkScrollbar, InputProps, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { FormApi } from "final-form";
import { useState } from "react";
import { Form, Field } from "react-final-form";
import createDecorator from "final-form-calculate";
import { z } from "zod";
import InputMask from "react-input-mask";
import { unmask } from "../utils/formUtils";

const UserData = z.object({
  name: z.string(),
  email: z.string().email("Digite um E-mail válido"),
  cpf: z.string(),
  cep: z.number().min(8),
});

const UserEmail = z.string().email("Digite um E-mail válido");

// TODO update values by validateCep result
const addressUpdatePerCep = createDecorator({
  field: "cep",
  updates: {
    complemento: (cepValue, allValues) => {
      const unmakedCep = unmask(cepValue);
      if (unmakedCep.length === 9) {
        console.log(unmakedCep);
        return "mc donald";
      }

      return allValues.complemento;
    },
    city: (cepValue, allValues) => {
      return "cidade da pamonha";
    },
  },
});

const ProfileForm = () => {
  const [isVisualizationOnly, setIsVisualizationOnly] = useState(true);
  const [visualizationDefaultValues, setVisualizationDefaultValues] = useState({
    name: "ronaldinho",
    email: "ronaldinho@gmail.com",
    cpf: "999.999.999-99",
    city: "taipeiiii",
    cep: "88888888",
    complemento: "queijo",
  });

  // TODO Updates default values on state
  // TODO Change isVisualizationOnly to true
  const onSubmit = (formData: any) => {
    try {
      console.log(formData);
    } catch {
      console.log();
    }
  };

  const validateCep = (
    cep: string,
    form: FormApi<any, Partial<any>>,
    values: any
  ) => {
    if (!isVisualizationOnly) {
      console.log(values);
      if (typeof cep !== "undefined") {
        if (cep.length === 8) {
          console.log(values);
          //form.change("complemento", "complemento from cep");
          // form.values.city = ValuesFromCep.city;
          // values.complemento = "complemento novo";
        }
      }
    }
  };

  const validateForm = () => {};

  return (
    <>
      <Form
        onSubmit={onSubmit}
        decorators={[addressUpdatePerCep]}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Required";
          }
          return errors;
        }}
        render={({ handleSubmit, form, values }) => (
          <form onSubmit={handleSubmit}>
            <Box sx={{ margin: "10px 0" }}>
              <Field name="name" initialValue={visualizationDefaultValues.name}>
                {({ input, meta }) => (
                  <TextField
                    fullWidth
                    label="Name"
                    helperText={!isVisualizationOnly && meta.error}
                    error={!isVisualizationOnly && meta.invalid}
                    variant="filled"
                    disabled={isVisualizationOnly}
                    value={
                      isVisualizationOnly
                        ? visualizationDefaultValues.name
                        : input.value
                    }
                    onChange={input.onChange}
                  />
                )}
              </Field>
            </Box>
            <Box sx={{ margin: "10px 0" }}>
              <Field name="email">
                {({ input, meta }) => (
                  <TextField
                    disabled={isVisualizationOnly}
                    type="email"
                    fullWidth
                    error={meta.invalid}
                    helperText={meta.error}
                    label="E-mail"
                    variant="filled"
                    value={input.value}
                    onChange={input.onChange}
                  />
                )}
              </Field>
            </Box>
            <Box sx={{ margin: "10px 0" }}>
              <Field name="cpf">
                {({ input, meta }) => (
                  <TextField
                    disabled
                    label="CPF"
                    onChange={input.onChange}
                    value={input.value}
                    fullWidth
                    variant="filled"
                  />
                )}
              </Field>
            </Box>
            <Box sx={{ margin: "10px 0" }}>
              <Field name="cep" initialValue={visualizationDefaultValues.cep}>
                {({ input, meta }) => (
                  <InputMask
                    mask="99999-999"
                    label="CEP"
                    error={meta.invalid}
                    required
                    fullWidth
                    value={
                      isVisualizationOnly
                        ? visualizationDefaultValues.cep
                        : input.value
                    }
                    onChange={input.onChange}
                    disabled={isVisualizationOnly}
                  >
                    {(inputProps: any) => (
                      <TextField
                        {...inputProps}
                        value={
                          isVisualizationOnly
                            ? visualizationDefaultValues.cep
                            : input.value
                        }
                        onChange={input.onChange}
                        disabled={isVisualizationOnly}
                        variant="filled"
                      />
                    )}
                  </InputMask>
                )}
              </Field>
            </Box>
            <Box sx={{ margin: "10px 0" }}>
              <Field
                name="complemento"
                initialValue={visualizationDefaultValues.complemento}
              >
                {({ input, meta }) => (
                  <TextField
                    label="Complemento"
                    onChange={input.onChange}
                    value={
                      isVisualizationOnly
                        ? visualizationDefaultValues.complemento
                        : input.value
                    }
                    disabled={isVisualizationOnly}
                    fullWidth
                    variant="filled"
                  />
                )}
              </Field>
            </Box>
            <Box sx={{ margin: "10px 0" }}>
              <Field name="city" initialValue={visualizationDefaultValues.city}>
                {({ input, meta }) => (
                  <TextField
                    label="City"
                    onChange={input.onChange}
                    value={
                      isVisualizationOnly
                        ? visualizationDefaultValues.city
                        : input.value
                    }
                    disabled
                    fullWidth
                    variant="filled"
                  />
                )}
              </Field>
            </Box>
            {isVisualizationOnly ? (
              <Box>
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsVisualizationOnly(false);
                  }}
                >
                  Edit
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  width: "18%",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => {
                    setIsVisualizationOnly(true);
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" variant="contained">
                  Submit
                </Button>
              </Box>
            )}
          </form>
        )}
      />
    </>
  );
};

export default ProfileForm;
