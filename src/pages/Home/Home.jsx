import React from "react";
import { Box, Typography, Card, CardMedia } from "@mui/material";
import Render3d from "../../components/renderer/Render3d";
import Humancell from "../../components/model/HumanCell";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const [selectedCard, setSelectedCard] = React.useState(0); // Default selected card is the third one
  const cards = [
    { id: 0, title: "Card 1", image: "https://via.placeholder.com/300" },
    { id: 1, title: "Card 2", image: "https://via.placeholder.com/300" },
    { id: 2, title: "Card 3", image: "https://via.placeholder.com/300" },
    { id: 3, title: "Card 4", image: "https://via.placeholder.com/300" },
    { id: 4, title: "Card 5", image: "https://via.placeholder.com/300" },
  ];

  const handleCardClick = (index) => {
    setSelectedCard(index); // Set selected card based on index
  };

  const settings = {
    centerMode: true, // Enable center mode
    infinite: true,
    speed: 500,
    centerPadding: "60px",
    slidesToShow: 3, // Show 3 items at a time
    slidesToScroll: 1,
    focusOnSelect: true, // Allow clicking to select a card
    dots: true, // Display navigation dots
    beforeChange: (_current, next) => setSelectedCard(next), // Update selected card before change
    responsive: [
      {
        breakpoint: 768, // Adjust for smaller screens (like tablets and mobile)
        settings: {
          slidesToShow: 1, // Show 1 item on small screens
          centerMode: true, // Keep centered mode on smaller screens
        },
      },
    ],
  };

  const styles = {
    headerBox: {
      width: { lg: "80%", sm: "100%" },
      height: 500,
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
        <Typography variant="h6" sx={{ mb: 3 }}>
          {cards[selectedCard].title} {/* Display selected card title */}
        </Typography>

        {/* Carousel Layout */}
        <Slider {...settings}>
          {cards.map((card, index) => (
            <Box
              key={card.id}
              onClick={() => handleCardClick(index)} // Handle card click
              sx={{
                transform: selectedCard === index ? "scale(1.1)" : "scale(0.9)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                opacity: selectedCard === index ? 1 : 0.6,
              }}
            >
              <Card
                sx={{
                  boxShadow: selectedCard === index ? 6 : 1,
                  bgcolor:
                    selectedCard === index ? "#88C273" : "background.paper",
                }}
              >
                <CardMedia
                  component="img"
                  height="300"
                  image={card.image} // Replace with your image URL
                  alt={card.title}
                  sx={{ p: 2 }}
                />
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
