import useApiQuery from "./useApiQuery";

const useForms = () => useApiQuery("forms", "/insurance/forms");

export default useForms;
