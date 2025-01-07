import React from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import Render3d from "../../components/renderer/Render3d";
import Humancell from "../../components/model/HumanCell";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [selectedCard, setSelectedCard] = React.useState(0); // Default selected card is the third one
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const cards = [
    {
      id: 0,
      title: "Digestive System",
      image: "/images/digestive.png",
      link: "/lessons#digestive-system",
    },
    {
      id: 1,
      title: "Stages of Mitosis",
      image: "/images/Stages of Mitosis.png",
      link: "/lessons#mitosis",
    },
    {
      id: 2,
      title: "Meiosis",
      image: "/images/meiosis_1.png",
      link: "/lessons#meiosis",
    },
    {
      id: 3,
      title: "Mendelian Genetics",
      image: "/images/Mendelian Genetics.png",
      link: "/lessons#mendelian-genetics",
    },
    {
      id: 4,
      title: "Trophic Level - Role of Organism",
      image: "/images/Role of organism.png",
      link: "/lessons#organism",
    },
  ];

  const handleCardClick = (index) => {
    setSelectedCard(index); // Set selected card based on index
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 960, // For tablets
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600, // For mobile
        settings: { slidesToShow: 1 },
      },
    ],
    beforeChange: (_current, next) => setSelectedCard(next),
    customPaging: (i) => (
      <div
        style={{
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: selectedCard === i ? "#4CAF50" : "#CCC",
          margin: "0 4px",
          transition: "background-color 0.3s ease",
          marginTop: "20px",
        }}
      ></div>
    ),
    appendDots: (dots) => (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        {dots}
      </div>
    ),
  };

  const styles = {
    headerBox: {
      width: { lg: "80%", sm: "100%" },
      height: 400,
      mx: "auto",
    },
  };

  return (
    <Box sx={{ overflowX: "hidden" }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", my: 4 }}>
        <Box sx={styles.headerBox}>
          <Render3d>
            <Humancell />
          </Render3d>
        </Box>
        <Typography
          variant="body1"
          sx={{ mt: 4, width: { xs: "90%", sm: "80%", md: "60%" }, mx: "auto" }}
        >
          Scan and Learn: A Supplementary Materials in Quarter 4 For Grade 8
          Linked on Internet Using QR Codes
        </Typography>
      </Box>

      {/* Related Topics Section */}
      <Box sx={{ textAlign: "center", my: 2 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          RELATED TOPICS
        </Typography>

        {/* Dynamically update the related topic based on the selected card */}
        <Typography variant="h6" sx={{ textAlign: "center", mb: 3 }}>
          {cards[selectedCard].title} {/* Display selected card title */}
        </Typography>

        {/* Carousel */}
        <Slider {...settings}>
          {cards.map((card, index) => (
            <Box
              key={card.id}
              onClick={() => handleCardClick(index)}
              sx={{
                transform: selectedCard === index ? "scale(1.1)" : "scale(0.9)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                opacity: selectedCard === index ? 1 : 0.6,
                px: isMobile ? 1 : 2,
              }}
            >
              <Link
                href={selectedCard === index ? card.link : undefined}
                underline="none"
                onClick={(e) => {
                  if (selectedCard !== index) e.preventDefault();
                }}
              >
                <Card
                  sx={{
                    boxShadow:
                      selectedCard === index
                        ? "0px 4px 20px rgba(0,0,0,0.3)"
                        : "0px 2px 10px rgba(0,0,0,0.1)",
                    backgroundColor:
                      selectedCard === index ? "#E8F5E9" : "#FFFFFF",
                    borderRadius: "16px",
                    overflow: "hidden",
                    height: "400px",
                    transition: "box-shadow 0.3s ease",
                    padding: { md: 1 },
                  }}
                >
                  {/* Card Media */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={card.image}
                      alt={card.title}
                      sx={{
                        maxWidth: "80%",
                        maxHeight: "90%",
                        borderRadius: "8px",
                        border: "2px solid #ddd",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Card>
              </Link>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* About Section */}
      <Box sx={{ textAlign: "center", my: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          About
        </Typography>
        <Typography
          variant="body1"
          sx={{ mx: "auto", width: { xs: "90%", sm: "80%", md: "60%" } }}
        >
          Bioverse is your go-to platform for Grade 8 biology resources, study
          guides, and interactive learning tools. We aim to simplify biology
          concepts and foster a vibrant community for students and educators to
          connect, learn, and grow together.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
