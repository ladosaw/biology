import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Avatar,
  Stack,
} from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Ranking = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const data = [
    {
      user_id: 10,
      name: "Omis, Jay K",
      email: "jay@example.com",
      total_score: 30,
      latest_updated_at: "2025-03-19",
    },
    {
      user_id: 3,
      name: "Lee, Garry K",
      email: "garry@example.com",
      total_score: 20,
      latest_updated_at: "2025-03-01",
    },
    {
      user_id: 6,
      name: "Park, Jet P",
      email: "jet@example.com",
      total_score: 10,
      latest_updated_at: "2025-02-08",
    },
    {
      user_id: 1,
      name: "Doe, John D",
      email: "john@example.com",
      total_score: 9,
      latest_updated_at: "2025-03-19",
    },
    {
      user_id: 1,
      name: "Doe, John D",
      email: "john@example.com",
      total_score: 9,
      latest_updated_at: "2025-03-19",
    },
    {
      user_id: 1,
      name: "Doe, John D",
      email: "john@example.com",
      total_score: 9,
      latest_updated_at: "2025-03-19",
    },
    {
      user_id: 1,
      name: "Doe, John D",
      email: "john@example.com",
      total_score: 9,
      latest_updated_at: "2025-03-19",
    },
    {
      user_id: 1,
      name: "Doe, John D",
      email: "john@example.com",
      total_score: 9,
      latest_updated_at: "2025-03-19",
    },
    {
      user_id: 1,
      name: "Doe, John D",
      email: "john@example.com",
      total_score: 9,
      latest_updated_at: "2025-03-19",
    },
    {
      user_id: 1,
      name: "Doe, John D",
      email: "john@example.com",
      total_score: 9,
      latest_updated_at: "2025-03-19",
    },
    {
      user_id: 1,
      name: "Doe, John D",
      email: "john@example.com",
      total_score: 9,
      latest_updated_at: "2025-03-19",
    },
  ];

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await API.get(`/worksheets/ranking`, {
    //       headers: { Authorization: `Bearer ${authToken}` },
    //     });
    //     if (response.status !== 200) throw new Error("Failed to fetch data");
    //     console.log(response.data?.rankings);
    //     setStudents(response.data?.rankings);
    //   } catch (err) {
    //     setError(err.message);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // if (!authToken) {
    //   navigate("/login");
    //   return;
    // }
    // fetchData();
    setStudents(data);
    setLoading(false);
  }, []);

  const sortedStudents = [...students].sort(
    (a, b) => b.total_score - a.total_score
  );
  const topThree = sortedStudents.slice(0, 3);
  const rest = sortedStudents.slice(3);

  const trophyColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

  const podiumHeights = isMobile
    ? ["120px", "120px", "120px"]
    : ["220px", "160px", "120px"];
  const podiumLabels = ["1st", "2nd", "3rd"];

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 8 }}>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        align="center"
        fontWeight="bold"
        gutterBottom
      >
        🏆 Student Leaderboard
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {/* Podium Section */}
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            justifyContent="center"
            alignItems="flex-end"
            gap={4}
            mt={6}
          >
            {topThree.map((student, index) => (
              <Paper
                key={student.user_id}
                elevation={6}
                sx={{
                  backgroundColor: trophyColors[index],
                  width: isMobile ? "100%" : 120,
                  height: podiumHeights[index],
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  px: 1.5,
                  py: 2,
                  color: "#fff",
                  position: "relative",
                  textAlign: "center",
                }}
              >
                <EmojiEventsIcon
                  fontSize="large"
                  sx={{ position: "absolute", top: 10 }}
                />
                <Typography variant="caption" fontWeight="bold" mt={4}>
                  {podiumLabels[index]}
                </Typography>
                <Typography fontWeight="bold" fontSize="0.95rem" noWrap>
                  {student.name}
                </Typography>
                <Typography fontSize="0.85rem">
                  {student.total_score} pts
                </Typography>
              </Paper>
            ))}
          </Box>

          {/* Other Rankings Section */}
          <Paper
            sx={{
              mt: 6,
              px: isMobile ? 2 : 4,
              py: isMobile ? 3 : 4,
              borderRadius: 4,
              backgroundColor: theme.palette.background.paper,
              boxShadow: 4,
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
              gutterBottom
              textAlign="center"
              color="text.primary"
            >
              🔢 Other Rankings
            </Typography>

            {rest.length === 0 ? (
              <Typography align="center" color="text.secondary">
                No more students in the ranking.
              </Typography>
            ) : (
              <Box
                sx={{
                  maxHeight: 400, // You can adjust this to control the scrollable area height
                  overflowY: "auto", // Makes the container scrollable
                }}
              >
                <Stack spacing={2} mt={2}>
                  {rest.map((student, index) => (
                    <Box
                      key={student.user_id}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        borderBottom: "1px solid",
                        borderColor: "divider",
                        pb: 1,
                      }}
                    >
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar
                          sx={{
                            width: 30,
                            height: 30,
                            fontSize: "0.9rem",
                            bgcolor: "primary.main",
                          }}
                        >
                          {index + 4}
                        </Avatar>
                        <Typography variant="body1" fontWeight={500}>
                          {student.name}
                        </Typography>
                      </Box>
                      <Typography
                        variant="body2"
                        fontWeight={400}
                        color="text.secondary"
                      >
                        {student.total_score} pts
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
          </Paper>
        </>
      )}
    </Container>
  );
};

export default Ranking;
