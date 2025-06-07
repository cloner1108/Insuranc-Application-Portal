import { Box, CircularProgress, Typography } from "@mui/material";
import DataTable from "../components/DataTable/DataTable";
import useSubmissions from "../hooks/useSubmissions";

const Home = () => {
  const { data, isLoading, error } = useSubmissions();

  if (isLoading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
        <Typography color="error">{error.message}</Typography>
      </Box>
    );

  return (
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <DataTable data={data} tableName="Applications" />
    </Box>
  );
};

export default Home;
