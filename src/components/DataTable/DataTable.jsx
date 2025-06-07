import { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import useLocalStorage from "../../hooks/useLocalStorage";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

/**
 * @param {Object} props
 * @param {string} props.tableName - Name of the table for localStorage keys
 * @param {Object} props.data - API response object with { columns: [], data: [] }
 */
const DataTable = ({ data, tableName }) => {
  // Memoize columns and rows for performance
  const columns = useMemo(() => data?.columns || [], [data]);
  const rows = useMemo(() => data?.data || [], [data]);
  const isMobile = useMediaQuery("(max-width:600px)");

  // Memoize initial state to avoid recreation
  const initialState = useMemo(
    () => ({
      sorting: { sortModel: [{ field: columns[0], sort: "asc" }] },
      pagination: { paginationModel: { page: 0, pageSize: 5 } },
      columns: {
        columnVisibilityModel: {},
        orderedFields: columns,
        columnWidths: {},
      },
      filter: { filterModel: { items: [] } },
    }),
    [columns]
  );

  // Persist table state in localStorage
  const [tableState, setTableState] = useLocalStorage(
    `${tableName}DataTableState`,
    initialState
  );

  // Handlers for DataGrid state changes
  const onSortModelChange = useCallback(
    (model) => {
      setTableState((prev) => ({
        ...prev,
        sorting: {
          sortModel: model.length
            ? model
            : [{ field: columns[0], sort: "asc" }],
        },
      }));
    },
    [setTableState, columns]
  );

  const onPaginationModelChange = useCallback(
    (model) => {
      setTableState((prev) => ({
        ...prev,
        pagination: { paginationModel: model },
      }));
    },
    [setTableState]
  );

  const onColumnResize = useCallback(
    (params) => {
      setTableState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          columnWidths: {
            ...prev.columns.columnWidths,
            [params.colDef.field]: params.width,
          },
        },
      }));
    },
    [setTableState]
  );

  const onColumnVisibilityModelChange = useCallback(
    (model) => {
      setTableState((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          columnVisibilityModel: model,
        },
      }));
    },
    [setTableState]
  );

  const onFilterModelChange = useCallback(
    (model) => {
      setTableState((prev) => ({
        ...prev,
        filter: { filterModel: model },
      }));
    },
    [setTableState]
  );

  // Prepare columns for DataGrid
  const orderedColumns = tableState.columns.orderedFields || columns;
  const dataGridColumns = useMemo(
    () =>
      orderedColumns.map((col) => ({
        field: col,
        headerName: col,
        minWidth: 120,
        ...(tableState.columns.columnWidths[col]
          ? { width: tableState.columns.columnWidths[col] }
          : { flex: 1 }),
      })),
    [orderedColumns, tableState.columns.columnWidths]
  );

  return (
    <Paper
      sx={{
        width: "100%",
        overflowX: "auto",
        height: isMobile ? "auto" : 400,
        minHeight: 350,
        p: isMobile ? 1 : 2,
      }}
    >
      <div style={{ minWidth: isMobile ? 600 : "unset" }}>
        <DataGrid
          disableRowSelectionOnClick
          rows={rows}
          columns={dataGridColumns}
          getRowId={(row) =>
            row.id ?? row._id ?? row.key ?? JSON.stringify(row)
          }
          pageSizeOptions={[5, 10]}
          onColumnResize={onColumnResize}
          onSortModelChange={onSortModelChange}
          onPaginationModelChange={onPaginationModelChange}
          onColumnVisibilityModelChange={onColumnVisibilityModelChange}
          onFilterModelChange={onFilterModelChange}
          initialState={tableState}
          pagination
          autoHeight={isMobile}
          density={isMobile ? "compact" : "standard"}
          sx={{
            border: 1,
            borderColor: "divider",
            fontSize: isMobile ? 12 : 14,
            "& .MuiDataGrid-columnHeaders": {
              fontSize: isMobile ? 13 : 16,
            },
            "& .MuiDataGrid-toolbarContainer": {
              flexDirection: isMobile ? "column" : "row",
              alignItems: isMobile ? "stretch" : "center",
              gap: 1,
            },
          }}
          showToolbar
          slotProps={{
            toolbar: {
              sx: {
                backgroundColor: "background.default",
                color: "text.primary",
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                gap: 1,
              },
            },
          }}
        />
      </div>
    </Paper>
  );
};

DataTable.propTypes = {
  data: PropTypes.shape({
    columns: PropTypes.array,
    data: PropTypes.array,
  }),
  tableName: PropTypes.string.isRequired,
};

export default DataTable;
