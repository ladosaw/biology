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
  CircularProgress,
  Box,
} from "@mui/material";
import API from "../utils/api/api.js";

const Ranking = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const authToken = localStorage.getItem("authToken");

  const fetchData = async () => {
    try {
      const response = await API.get(`/worksheets/ranking`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.status !== 200) throw new Error("Failed to fetch data");
      console.log(response.data?.rankings);
      setStudents(response.data?.rankings);
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

  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 2, md: 4 } }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
      >
        Student Ranking
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={3}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          elevation={2}
          sx={{ borderRadius: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                <TableCell align="center">Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="center">Score</TableCell>
                <TableCell align="center">Last Updated</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.length > 0 ? (
                students
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student, index) => (
                    <TableRow key={student.user_id}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell align="center">
                        {student.total_score}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(
                          student.latest_updated_at
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={students.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => setRowsPerPage(+event.target.value)}
        />
      </Box>
    </Container>
  );
};

export default Ranking;
