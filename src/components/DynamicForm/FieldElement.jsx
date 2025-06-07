import { useEffect } from "react";
import { Controller } from "react-hook-form";
import useStateName from "../../hooks/useStateName";
import {
  Box,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  FormGroup,
  Typography,
  Grid,
} from "@mui/material";

const FieldElement = ({
  field,
  control,
  errors,
  watch,
  setValue,
  getValues,
  values,
}) => {
  // Handle dynamic state options if needed
  let options = field.options || [];
  if (field.dynamicOptions && field.id === "state") {
    const country = watch(field.dynamicOptions.dependsOn);
    const { data: stateData, isLoading } = useStateName(country);
    options = isLoading ? [] : stateData?.states || [];

    // Reset state value when country changes, set to first option if available
    useEffect(() => {
      if (options.length > 0) {
        setValue("state", options[0]);
      }
    }, [country]);
  }

  // Handle conditional visibility
  if (field.visibility) {
    const depValue = watch(field.visibility.dependsOn);
    if (
      field.visibility.condition === "equals" &&
      depValue !== field.visibility.value
    ) {
      return null;
    }
  }

  // Handle group fields (nested fields)
  if (field.type === "group" && Array.isArray(field.fields)) {
    return (
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          {field.label}
        </Typography>
        <Grid container spacing={2}>
          {field.fields.map((childField) => (
            <Grid item size={{ xs: 12 }} key={childField.id}>
              <FieldElement
                field={childField}
                control={control}
                errors={errors}
                watch={watch}
                setValue={setValue}
                getValues={getValues}
                values={values}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  switch (field.type) {
    case "text":
    case "number":
      return (
        <Controller
          name={field.id}
          control={control}
          rules={{
            required: field.required ? `${field.label} is required` : false,
            ...(field.validation?.min && { min: field.validation.min }),
            ...(field.validation?.max && { max: field.validation.max }),
            ...(field.validation?.pattern && {
              pattern: new RegExp(field.validation.pattern),
            }),
          }}
          render={({ field: rhfField }) => (
            <TextField
              {...rhfField}
              label={field.label}
              type={field.type}
              placeholder="Enter value"
              fullWidth
              error={!!errors[field.id]}
              helperText={errors[field.id]?.message}
              margin="normal"
              slotProps={{ htmlInput: { className: "no-spinner" } }}
              value={
                rhfField.value !== undefined && rhfField.value !== null
                  ? rhfField.value
                  : ""
              }
            />
          )}
        />
      );
    case "date":
      // Get today's date in yyyy-mm-dd format
      const today = new Date().toISOString().split("T")[0];
      return (
        <Controller
          name={field.id}
          control={control}
          rules={{
            required: field.required ? `${field.label} is required` : false,
            // Optionally, add validation to prevent future dates
            validate: (value) =>
              !value || value <= today || "Date cannot be in the future",
          }}
          render={({ field: rhfField }) => (
            <TextField
              {...rhfField}
              label={field.label}
              type="date"
              InputLabelProps={{ shrink: true }}
              fullWidth
              error={!!errors[field.id]}
              helperText={errors[field.id]?.message}
              margin="normal"
              inputProps={{ max: today }}
              slotProps={{ htmlInput: { max: today } }}
              onChange={(e) => {
                // Only allow valid date string (yyyy-mm-dd)
                const value = e.target.value;
                if (/^\d{0,4}-?\d{0,2}-?\d{0,2}$/.test(value) || value === "") {
                  rhfField.onChange(value);
                }
              }}
            />
          )}
        />
      );
    case "select":
      return (
        <Controller
          key={
            field.id +
            "_" +
            options
              .map((opt) => (typeof opt === "object" ? opt.value : opt))
              .join("_")
          }
          name={field.id}
          control={control}
          rules={{
            required: field.required ? `${field.label} is required` : false,
          }}
          render={({ field: rhfField }) => (
            <FormControl fullWidth margin="normal" error={!!errors[field.id]}>
              <InputLabel>{field.label}</InputLabel>
              <Select
                {...rhfField}
                label={field.label}
                value={rhfField.value ?? ""}
              >
                {options.map((option) =>
                  typeof option === "object" ? (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ) : (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  )
                )}
              </Select>
              <Typography variant="caption" color="error">
                {errors[field.id]?.message}
              </Typography>
            </FormControl>
          )}
        />
      );
    case "radio":
      return (
        <Controller
          name={field.id}
          control={control}
          rules={{
            required: field.required ? `${field.label} is required` : false,
          }}
          render={({ field: rhfField }) => (
            <FormControl
              component="fieldset"
              margin="normal"
              error={!!errors[field.id]}
            >
              <Typography>{field.label}</Typography>
              <RadioGroup {...rhfField} value={rhfField.value ?? ""} row>
                {field.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
              <Typography variant="caption" color="error">
                {errors[field.id]?.message}
              </Typography>
            </FormControl>
          )}
        />
      );
    case "checkbox":
      return (
        <Controller
          name={field.id}
          control={control}
          rules={{
            required: field.required ? `${field.label} is required` : false,
          }}
          render={({ field: rhfField }) => (
            <FormControl
              component="fieldset"
              margin="normal"
              error={!!errors[field.id]}
            >
              <Typography>{field.label}</Typography>
              <FormGroup row>
                {field.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={rhfField.value?.includes(option) || false}
                        onChange={(e) => {
                          const newValue = rhfField.value || [];
                          if (e.target.checked) {
                            rhfField.onChange([...newValue, option]);
                          } else {
                            rhfField.onChange(
                              newValue.filter((v) => v !== option)
                            );
                          }
                        }}
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
              <Typography variant="caption" color="error">
                {errors[field.id]?.message}
              </Typography>
            </FormControl>
          )}
        />
      );
    default:
      return null;
  }
};

export default FieldElement;
