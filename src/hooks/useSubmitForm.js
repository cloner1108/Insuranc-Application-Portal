import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../services/axiosInterceptor";

const submitForm = async (formData) => {
  const { data } = await axiosInstance.post(
    "/insurance/forms/submit",
    formData
  );
  return data;
};

const useSubmitForm = () => useMutation({ mutationFn: submitForm });

export default useSubmitForm;
