import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import API from "../utils/api/api.js";

const AdminDash = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "titles",
    direction: "asc",
  });

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get("/worksheets", {
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
    fetchData();
  }, []);

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  const filteredRows = rows.filter((row) =>
    row.user_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRows = [...filteredRows].sort((a, b) =>
    sortConfig.direction === "asc"
      ? a[sortConfig.key] > b[sortConfig.key]
        ? 1
        : -1
      : a[sortConfig.key] < b[sortConfig.key]
      ? 1
      : -1
  );

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 } }}>
      <Typography
        variant="h5"
        sx={{
          mb: { xs: 1, md: 2 },
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Admin Dashboard
      </Typography>

      <TextField
        label="Search by User ID"
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
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer
            component={Paper}
            elevation={2}
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              minWidth: { xs: 600, sm: "100%" },
            }}
          >
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell
                    onClick={() => handleSort("titles")}
                    sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Title
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("name")}
                    sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Name
                  </TableCell>
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    Worksheet No
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("score")}
                    sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Score
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort("created_at")}
                    sx={{ cursor: "pointer", whiteSpace: "nowrap" }}
                  >
                    Date Added
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.worksheet_id}>
                      <TableCell>{row.titles}</TableCell>
                      <TableCell>
                        {`${row.user.lname}, ${row.user.fname} ${row.user?.mname}.`}
                      </TableCell>
                      <TableCell>{row.worksheet_no}</TableCell>
                      <TableCell>{row.score}</TableCell>
                      <TableCell>
                        {new Date(row.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={sortedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)}
        />
      </Box>
    </Container>
  );
};

export default AdminDash;
