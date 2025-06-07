import useApiQuery from "./useApiQuery";

const useStateName = (country) =>
  useApiQuery(
    ["stateName", country],
    `/getStates?country=${encodeURIComponent(country)}`,
    { enabled: !!country }
  );

export default useStateName;
