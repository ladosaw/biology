import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import Render3d from "../../components/renderer/render3d";
import Humancell from "../../components/model/HumanCell";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [selectedCard, setSelectedCard] = React.useState(0); // Default selected card is the third one
  const cards = [
    {
      id: 0,
      title: "Digestive System",
      image: "/images/digestive.png",
    },
    {
      id: 1,
      title: "Stages of Mitosis",
      image: "/images/Stages of Mitosis.png",
    },
    { id: 2, title: "Meiosis", image: "/images/meiosis_1.png" },
    {
      id: 3,
      title: "Mendelian Genetics",
      image: "/images/Mendelian Genetics.png",
    },
    {
      id: 4,
      title: "Trophic Level - Role of Organism",
      image: "/images/Role of organism.png",
    },
  ];

  const handleCardClick = (index) => {
    setSelectedCard(index); // Set selected card based on index
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
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
        <Typography variant="body1" sx={{ mt: 4, width: "60%", mx: "auto" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum ex
          quasi vitae cupiditate assumenda dolores illo, reprehenderit cum
          voluptate soluta?
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

        {/* Carousel Layout */}
        <Slider {...settings}>
          {cards.map((card, index) => (
            <Box
              key={card.id}
              onClick={() => handleCardClick(index)}
              style={{
                transform:
                  selectedCard === index ? "scale(1.1)" : "scale(0.85)",
                transition:
                  "transform 0.3s ease-in-out, margin 0.3s ease-in-out",
                cursor: "pointer",
                opacity: selectedCard === index ? 1 : 0.6,
                margin: "0 60px", // Add margin to create gap between cards
              }}
            >
              <Card
                style={{
                  boxShadow:
                    selectedCard === index
                      ? "0px 4px 20px rgba(0,0,0,0.2)"
                      : "0px 2px 10px rgba(0,0,0,0.1)",

                  backgroundColor:
                    selectedCard === index ? "#E8F5E9" : "#FFFFFF",
                  borderRadius: "16px", // Rounded corners
                  overflow: "hidden",
                  height: "500px", // Uniform height
                  margin: "0 30px", // Add margin to create gap between cards
                }}
              >
                <Box
                  style={{
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
                    style={{
                      maxWidth: "80%",
                      maxHeight: "70%",
                      borderRadius: "8px",
                      border: "2px solid #ddd",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Card>
            </Box>
          ))}
        </Slider>
      </Box>

      {/* About Section */}
      <Box sx={{ textAlign: "center", my: 10 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          About
        </Typography>
        <Typography variant="body1" sx={{ mx: "auto", width: "60%" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
