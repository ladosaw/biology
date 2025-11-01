import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TablePagination,
  TextField,
  CircularProgress,
  Box,
  Button,
  Stack,
  Tooltip,
  TableSortLabel,
} from "@mui/material";
import Swal from "sweetalert2";
import { DeleteForever } from "@mui/icons-material";
import API from "../utils/api/api.js";

const User = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "asc",
  });

  const authToken = localStorage.getItem("authToken");

  const fetchData = async () => {
    try {
      const response = await API.get("/users", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status !== 200) throw new Error("Failed to fetch data");
      setRows(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [authToken, navigate]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = (data) => {
    return [...data].sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      if (sortConfig.key === "created_at" || sortConfig.key === "updated_at") {
        valA = new Date(valA);
        valB = new Date(valB);
      }

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  const filteredData = (data) => {
    return data.filter((row) =>
      `${row.lname} ${row.fname} ${row?.mname || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  const deleteRow = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await API.delete(`/users/${id}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        await fetchData();
        Swal.fire("Deleted!", "The user has been removed.", "success");
      } catch (err) {
        setError(err.message);
        Swal.fire("Error!", "Failed to delete user.", "error");
      }
    }
  };

  const renderTable = (data) => (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            {/* <TableCell>
              <TableSortLabel
                active={sortConfig.key === "created_at"}
                direction={sortConfig.direction}
                onClick={() => handleSort("created_at")}
              >
                Date Added
              </TableSortLabel>
            </TableCell> */}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            sortedData(data)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    {`${row.lname}, ${row.fname} ${row.mname || ""}`}
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  {/* <TableCell>
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell> */}
                  <TableCell>
                    <Stack
                      direction="row"
                      sx={{ gap: "1px" }}
                      alignItems="center"
                    >
                      <Button onClick={() => deleteRow(row.id)}>
                        <Tooltip title="Delete" placement="top-start">
                          <DeleteForever color="error" />
                        </Tooltip>
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={filteredData(rows).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        }}
      />
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 } }}>
      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <Box sx={{ mt: 2 }}>
          {filteredData(rows).length > 0 ? (
            renderTable(filteredData(rows))
          ) : (
            <Typography align="center">No data available</Typography>
          )}
        </Box>
      )}
    </Container>
  );
};

export default User;
