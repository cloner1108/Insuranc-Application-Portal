import useApiQuery from "./useApiQuery";

const useSubmissions = () =>
  useApiQuery("submissions", "/insurance/forms/submissions");

export default useSubmissions;
