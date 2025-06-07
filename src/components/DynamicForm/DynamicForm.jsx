import { useEffect } from "react";
import FieldElement from "./FieldElement";
import { Box, Button, Grid, Typography } from "@mui/material";

const DynamicForm = ({
  values,
  control,
  onSubmit,
  watch,
  setValue,
  getValues,
  errors,
  handleBack,
  activeStep,
  newApplicationSteps,
  stepFields,
}) => {
  // Helper to check field visibility
  const isFieldVisible = (field) => {
    if (!field.visibility) return true;
    const depValue = watch(field.visibility.dependsOn);
    if (field.visibility.condition === "equals") {
      return depValue === field.visibility.value;
    }
    return true;
  };

  // Effect: When a "dependsOn" field changes, clear all dependent fields' values
  useEffect(() => {
    // Find all fields that have a visibility.dependsOn
    stepFields.forEach((field) => {
      if (field.visibility && field.visibility.dependsOn) {
        const depValue = values[field.visibility.dependsOn];
        // If the dependent field is currently not visible, clear its value
        if (
          field.visibility.condition === "equals" &&
          depValue !== field.visibility.value &&
          values[field.id] !== undefined
        ) {
          setValue(field.id, undefined);
        }
      }
    });
  }, [values, stepFields, setValue]);

  // Recursively check required fields
  const areRequiredFieldsFilled = (fields) =>
    fields.every((field) => {
      if (!isFieldVisible(field)) return true;
      if (field.type === "group" && Array.isArray(field.fields)) {
        return areRequiredFieldsFilled(field.fields);
      }
      if (field.required) {
        const value = values[field.id];
        if (Array.isArray(value)) return value.length > 0;
        return value !== undefined && value !== null && value !== "";
      }
      return true;
    });

  // Recursively check for errors
  const hasVisibleErrors = (fields) =>
    fields.some((field) => {
      if (!isFieldVisible(field)) return false;
      if (field.type === "group" && Array.isArray(field.fields)) {
        return hasVisibleErrors(field.fields);
      }
      return !!errors[field.id];
    });

  const isSubmitDisabled =
    hasVisibleErrors(stepFields) || !areRequiredFieldsFilled(stepFields);

  return (
    <form onSubmit={onSubmit}>
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "100%",
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        <Typography sx={{ mt: 2, mb: 1 }}>
          Step {activeStep + 1} : {newApplicationSteps[activeStep]}
        </Typography>

        {activeStep === newApplicationSteps.length - 1 && (
          <Typography color="error" fontWeight={600} sx={{ mb: 2 }}>
            Note: The data will not be submitted until you press the FINISH
            button. You can navigate through the steps, and the actual
            submission will only occur when you click the FINISH button. All
            changes made in the form will be saved, but the final action of
            submitting the data will happen after pressing FINISH.
          </Typography>
        )}

        <Box sx={{ width: "100%", mb: 2 }}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {stepFields?.map(
              (field) =>
                isFieldVisible(field) && (
                  <Grid key={field.id} size={{ xs: 12 }}>
                    <FieldElement
                      field={field}
                      control={control}
                      errors={errors}
                      watch={watch}
                      setValue={setValue}
                      getValues={getValues}
                      values={values}
                    />
                  </Grid>
                )
            )}
          </Grid>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "row", pt: 2, width: "100%" }}
        >
          <Button
            color="info"
            variant="outlined"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={isSubmitDisabled}
          >
            {activeStep === newApplicationSteps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default DynamicForm;
