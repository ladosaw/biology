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
  Button,
  Tabs,
  Tab,
} from "@mui/material";
import API from "../utils/api/api.js";
import Modal from "../components/Modal/Modal.jsx";
import SignUp from "./SignUp.jsx";
import ManualCheck from "./ManualCheck.jsx";

const AdminDash = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0); // Track active tab
  const [selectedRow, setSelectedRow] = useState(null);
  const toggleCheckModal = () => setIsCheckModalOpen((prev) => !prev);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  const [sortConfig, setSortConfig] = useState({
    key: "titles",
    direction: "asc",
  });

  const authToken = localStorage.getItem("authToken");

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

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  const filteredRows = rows.filter((row) => {
    const fullName = `${row.user.lname}, ${row.user.fname} ${
      row.user.mname || ""
    }`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const sortedRows = [...filteredRows].sort((a, b) =>
    sortConfig.direction === "asc"
      ? a[sortConfig.key] > b[sortConfig.key]
        ? 1
        : -1
      : a[sortConfig.key] < b[sortConfig.key]
      ? 1
      : -1
  );

  const manualRows = sortedRows.filter((row) => row.is_manually === 1);
  const autoRows = sortedRows.filter((row) => row.is_manually === 0);

  const renderTable = (data) => (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>Title</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Worksheet No</TableCell>
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
            {tabIndex === 1 && <TableCell>Check Date</TableCell>}
            {tabIndex === 1 && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.worksheet_id}>
                  <TableCell>{row.titles}</TableCell>
                  <TableCell>
                    {`${row.user.lname}, ${row.user.fname} ${
                      row.user?.mname || ""
                    }`}
                  </TableCell>
                  <TableCell>
                    {row.worksheet_no === 0 ? "Evaluation" : row.worksheet_no}
                  </TableCell>
                  <TableCell>{row.score}</TableCell>
                  <TableCell>
                    {new Date(row.created_at).toLocaleDateString()}
                  </TableCell>
                  {tabIndex === 1 && (
                    <TableCell>
                      {new Date(row.updated_at).toLocaleDateString()}
                    </TableCell>
                  )}
                  {tabIndex === 1 && (
                    <TableCell>
                      <Button
                        onClick={() => {
                          setSelectedRow(row);
                          toggleCheckModal();
                        }}
                      >
                        Check Manually
                      </Button>
                    </TableCell>
                  )}
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
    </TableContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 } }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
      >
        Admin Dashboard
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" color="primary" onClick={toggleModal}>
          New User
        </Button>
      </Box>

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
        <>
          <Tabs
            value={tabIndex}
            onChange={(e, newValue) => setTabIndex(newValue)}
          >
            <Tab label="Automatically Checked" />
            <Tab label="Manually Checked" />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {tabIndex === 0 ? renderTable(autoRows) : renderTable(manualRows)}
          </Box>
        </>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={tabIndex === 0 ? autoRows.length : manualRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)}
        />
      </Box>

      <Modal open={isModalOpen} onClose={toggleModal} title="Add Student">
        <SignUp onClose={toggleModal} />
      </Modal>

      <Modal
        open={isCheckModalOpen}
        onClose={toggleCheckModal}
        title="Manual Check"
      >
        <ManualCheck
          worksheet={selectedRow}
          fetchData={fetchData}
          onClose={toggleCheckModal}
        />
      </Modal>
    </Container>
  );
};

export default AdminDash;
