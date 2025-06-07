import NewApplication from "../components/NewApplication/NewApplication";
import useForms from "../hooks/useForms";
import { Box, Typography } from "@mui/material";

const NewApplicationPage = () => {
  const { data, isLoading, error } = useForms();

  if (isLoading)
    return <Box sx={{ p: 4, textAlign: "center" }}>Loading...</Box>;
  if (error)
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );

  return <NewApplication data={data} />;
};

export default NewApplicationPage;
