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
  TableSortLabel,
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
  const [tabLesson, setTabLesson] = useState("lesson1");
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

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    if (!authToken) {
      navigate("/login");
      return;
    }
    fetchData();
  }, []);

  const sortedData = (data) => {
    return [...data].sort((a, b) => {
      let valA = a[sortConfig.key];
      let valB = b[sortConfig.key];

      if (sortConfig.key === "score") {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      } else if (
        sortConfig.key === "created_at" ||
        sortConfig.key === "updated_at"
      ) {
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
      `${row.user.lname} ${row.user.fname} ${row.user?.mname || ""}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  };

  const renderTable = (data) => (
    <TableContainer component={Paper} elevation={2} sx={{ borderRadius: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>Title</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Worksheet No</TableCell>
            <TableCell>
              {" "}
              <TableSortLabel
                active={sortConfig.key === "score"}
                direction={sortConfig.direction}
                onClick={() => handleSort("score")}
              >
                Score
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "created_at"}
                direction={sortConfig.direction}
                onClick={() => handleSort("created_at")}
              >
                Date Added
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "updated_at"}
                direction={sortConfig.direction}
                onClick={() => handleSort("updated_at")}
              >
                Check Date
              </TableSortLabel>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 ? (
            sortedData(data)
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

                  <TableCell>
                    {new Date(row.updated_at).toLocaleDateString()}
                  </TableCell>

                  {row.is_manually === 1 && (
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
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={rows[tabLesson] ? rows[tabLesson].length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)}
      />
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
            value={tabLesson}
            onChange={(e, newValue) => setTabLesson(newValue)}
          >
            {Object.keys(rows).map((lessonKey) => (
              <Tab
                key={lessonKey}
                value={lessonKey}
                label={lessonKey.replace("lesson", "Lesson ")}
              />
            ))}
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {rows[tabLesson] ? (
              renderTable(filteredData(rows[tabLesson]))
            ) : (
              <Typography align="center">No data available</Typography>
            )}
          </Box>
        </>
      )}

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
