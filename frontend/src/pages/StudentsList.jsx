import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid";
import CustomAvatar from "../utils/avatar/index";
import QuickSearchToolbar from "../views/QuickSearchToolbar";
import Layout from "../components/Layout/Layout";

const renderClient = (params) => {
  const { row } = params;
  const stateNum = Math.floor(Math.random() * 6);
  const states = [
    "success",
    "error",
    "warning",
    "info",
    "primary",
    "secondary",
  ];
  const color = states[stateNum];

  return (
    <CustomAvatar
      src={row.avatar.length ? row.avatar : ""}
      sx={{
        mr: 3,
        width: "1.875rem",
        height: "1.875rem",
        bgcolor: !row.avatar.length ? color : undefined,
      }}
    />
  );
};

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const columns = [
  {
    flex: 0.275,
    minWidth: 290,
    field: "name",
    headerName: "Name",
    renderCell: (params) => {
      const { row } = params;
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {renderClient(params)}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {row.name}
            </Typography>
            <Typography
              noWrap
              variant="caption"
              sx={{ color: "text.secondary" }}
            >
              {row.email}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.2,
    minWidth: 120,
    headerName: "Date",
    field: "email",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.email}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 110,
    field: "role",
    headerName: "Role",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        {params.row.role}
      </Typography>
    ),
  },
];

const TableColumns = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(7);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");

    const filteredRows = data.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setFilteredData(searchValue.length ? filteredRows : []);
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/user/all-users", {
        method: "GET",
      });
      const result = await response.json();
      if (response.ok) {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <Layout>
      <Card
        sx={{ margin: "1rem", boxShadow: 2 }}
        className="w-[95%] lg:w-[90%] rounded-xl"
      >
        <CardHeader title="All Users" />
        <DataGrid
          sx={{ height: "90vh", paddingInline: "1rem", border: "none" }}
          autoHeight
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={pageSize}
          hideFooter
          rowsPerPageOptions={[2, 10, 25, 50]}
          components={{ Toolbar: QuickSearchToolbar }}
          rows={filteredData.length ? filteredData : data}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          componentsProps={{
            baseButton: {
              variant: "outlined",
            },
            toolbar: {
              value: searchText,
              clearSearch: () => handleSearch(""),
              onChange: (event) => handleSearch(event.target.value),
            },
          }}
          onRowHover={(event) => {
            event.preventDefault();
            event.currentTarget.style.cursor = "pointer";
          }}
          onRowClick={(params) => {
            console.log("Row clicked:", params.row);
          }}
        />
      </Card>
    </Layout>
  );
};

export default TableColumns;
