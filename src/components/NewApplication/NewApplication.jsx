import { useForm } from "react-hook-form";
import useLocalStorage from "../../hooks/useLocalStorage";
import useSubmitForm from "../../hooks/useSubmitForm";
import { useNavigate } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Button,
} from "@mui/material";
import DynamicForm from "../../components/DynamicForm/DynamicForm";
import { newApplicationSteps } from "../../assets/constants";
import toast from "react-hot-toast";

const NewApplication = ({ data }) => {
  const navigate = useNavigate();
  const [processState, setProcessState] = useLocalStorage("newApplication", {
    activeStep: 0,
    data: {},
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: processState.data,
  });

  const values = watch();
  const { mutate, error } = useSubmitForm();

  const onStepSubmit = (formData) => {
    const isLastStep =
      processState.activeStep === newApplicationSteps.length - 1;
    const updatedData = { ...processState.data, ...formData };

    // Only reset if Insurance_Type has changed
    if (processState.activeStep === 0) {
      const getStep0FieldIds = () => {
        const step0Fields = [
          ...data[0].fields.find((f) => f.id === "personal_info").fields,
          ...data[0].fields.find((f) => f.id === "address").fields,
          "Insurance_Type",
        ];
        return step0Fields.map((f) => (typeof f === "string" ? f : f.id));
      };
      const step0Ids = getStep0FieldIds();

      // Filter updatedData to keep only step 0 fields
      const filteredData = {};
      Object.keys(updatedData).forEach((key) => {
        if (step0Ids.includes(key)) {
          filteredData[key] = updatedData[key];
        }
      });

      // Only reset if Insurance_Type changed
      if (processState.data.Insurance_Type !== filteredData.Insurance_Type) {
        setProcessState((prevState) => ({
          ...prevState,
          activeStep: prevState.activeStep + 1,
          data: filteredData,
        }));
        reset(filteredData); // Reset form values
      } else {
        setProcessState((prevState) => ({
          ...prevState,
          activeStep: prevState.activeStep + 1,
          data: filteredData,
        }));
      }
      return;
    }

    if (isLastStep) {
      toast("Submitting your application...", {
        id: "submit-toast",
        type: "loading",
      });
      mutate(updatedData, {
        onSuccess: () => {
          navigate("/");
          toast("Application submitted successfully!", {
            id: "submit-toast",
            type: "success",
          });
          setProcessState({ activeStep: 0, data: {} });
          reset({});
        },
        onError: (error) => {
          console.error("Submission error:", error);
        },
      });
    } else {
      setProcessState((prevState) => ({
        ...prevState,
        activeStep: prevState.activeStep + 1,
        data: updatedData,
      }));
    }
  };

  const handleBack = () => {
    setProcessState((prevState) => ({
      ...prevState,
      activeStep: prevState.activeStep - 1,
    }));
  };

  const handleReset = () => {
    setProcessState({ activeStep: 0, data: {} });
    reset({});
  };

  const getStepFields = (data, step, values) => {
    if (!data || !data[0]) return [];

    // Step 0: personal_info + address
    if (step === 0) {
      return [
        {
          id: "personal_info",
          label: "Personal Information",
          type: "group",
          fields: [
            ...data[0].fields.find((f) => f.id === "personal_info").fields,
          ],
        },
        {
          id: "address",
          label: "Address",
          type: "group",
          fields: [...data[0].fields.find((f) => f.id === "address").fields],
        },
        {
          id: "Insurance_Type",
          label: "Insurance Type",
          type: "select",
          options: data.map((f) => ({
            value: f.formId,
            label: f.title,
          })),
          required: true,
        },
      ];
    }

    // Step 1: health_info or other dynamic fields
    if (step === 1) {
      return (
        data.find((f) => f.formId === values.Insurance_Type)?.fields || []
      ).filter((f) => f.id !== "personal_info" && f.id !== "address");
    }

    // Add more steps as needed
    return [];
  };

  const stepFields = getStepFields(data, processState.activeStep, values);

  return (
    <Box sx={{ width: "100%", maxWidth: 600, margin: "0 auto", mt: 4 }}>
      <Stepper activeStep={processState.activeStep}>
        {newApplicationSteps.map((step, index) => (
          <Step key={index}>
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {processState.activeStep === newApplicationSteps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <DynamicForm
          values={values}
          control={control}
          onSubmit={handleSubmit(onStepSubmit)}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          errors={errors}
          handleBack={handleBack}
          activeStep={processState.activeStep}
          newApplicationSteps={newApplicationSteps}
          stepFields={stepFields}
        />
      )}
    </Box>
  );
};

export default NewApplication;
