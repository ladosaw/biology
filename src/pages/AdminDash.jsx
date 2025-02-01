import React, { useState } from "react";
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
} from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

const AdminDash = () => {
  const rows = [
    {
      id: 1,
      title: "Math Exam",
      grade: "8",
      name: "John Doe",
      worksheet_no: 5,
      score: 95,
    },
    {
      id: 2,
      title: "Science Quiz",
      grade: "9",
      name: "Jane Smith",
      worksheet_no: 3,
      score: 88,
    },
    {
      id: 3,
      title: "History Test",
      grade: "8",
      name: "Emily Johnson",
      worksheet_no: 2,
      score: 91,
    },
    {
      id: 4,
      title: "Physics Test",
      grade: "10",
      name: "Michael Brown",
      worksheet_no: 4,
      score: 87,
    },
    {
      id: 5,
      title: "Chemistry Exam",
      grade: "7",
      name: "Sarah White",
      worksheet_no: 6,
      score: 92,
    },
    {
      id: 6,
      title: "English Test",
      grade: "8",
      name: "Lucas Green",
      worksheet_no: 3,
      score: 89,
    },
    {
      id: 7,
      title: "Geography Quiz",
      grade: "9",
      name: "Olivia Black",
      worksheet_no: 2,
      score: 84,
    },
    {
      id: 8,
      title: "Math Quiz",
      grade: "10",
      name: "David Lee",
      worksheet_no: 5,
      score: 93,
    },
    {
      id: 9,
      title: "Biology Exam",
      grade: "7",
      name: "Sophia Adams",
      worksheet_no: 4,
      score: 90,
    },
    {
      id: 10,
      title: "Art Test",
      grade: "8",
      name: "Daniel Harris",
      worksheet_no: 3,
      score: 85,
    },
    {
      id: 11,
      title: "Music Exam",
      grade: "9",
      name: "Charlotte Scott",
      worksheet_no: 2,
      score: 92,
    },
    {
      id: 12,
      title: "History Quiz",
      grade: "7",
      name: "Benjamin Hall",
      worksheet_no: 5,
      score: 88,
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  }); // Sorting state

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    } else {
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    }
  });

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, textAlign: "center", fontWeight: "bold" }}
      >
        Admin Dashboard
      </Typography>

      <TextField
        label="Search by Name"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />

      <TableContainer
        component={Paper}
        elevation={2}
        sx={{ borderRadius: 2, overflow: "hidden" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell
                sx={{ cursor: "pointer" }}
                onClick={() => handleSort("title")}
              >
                Title
                {sortConfig.key === "title" ? (
                  sortConfig.direction === "asc" ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )
                ) : null}
              </TableCell>
              <TableCell
                sx={{ cursor: "pointer" }}
                onClick={() => handleSort("name")}
              >
                Name
                {sortConfig.key === "name" ? (
                  sortConfig.direction === "asc" ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )
                ) : null}
              </TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Worksheet No</TableCell>
              <TableCell
                sx={{ cursor: "pointer" }}
                onClick={() => handleSort("score")}
              >
                Score
                {sortConfig.key === "score" ? (
                  sortConfig.direction === "asc" ? (
                    <ArrowUpward fontSize="small" />
                  ) : (
                    <ArrowDownward fontSize="small" />
                  )
                ) : null}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.grade}</TableCell>
                  <TableCell>{row.worksheet_no}</TableCell>
                  <TableCell>{row.score}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={sortedRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />
    </Container>
  );
};

export default AdminDash;
