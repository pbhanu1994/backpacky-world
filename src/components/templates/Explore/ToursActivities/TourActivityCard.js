import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
} from "@mui/material";
import Slider from "react-slick";
import { formatCurrency } from "../../../../utils/formatCurrency";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TourActivityCard = ({ activity }) => {
  const sliderSettings = {
    dots: activity.pictures.length > 1,
    infinite: activity.pictures.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Card
      sx={{
        height: 500,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Ensure uniform distribution
        cursor: "pointer",
        paddingBottom: "16px", // For consistent bottom padding
      }}
      onClick={() => {
        window.open(activity.bookingLink, "_blank");
      }}
    >
      <div className="slider-container">
        <Slider {...sliderSettings} autoplay arrows>
          {activity.pictures.map((picture, index) => (
            <div key={`${activity.name}-${index}`}>
              <img
                key={`${activity.name}-${index}`}
                src={picture}
                alt={activity.name}
                style={{ width: "100%", height: "auto", maxHeight: 200 }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <CardContent
        sx={{
          flexGrow: 1,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ whiteSpace: "normal", wordWrap: "break-word" }} // Make sure long titles are shown
        >
          {activity.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            marginTop: 2,
          }}
        >
          {activity.shortDescription}
        </Typography>
        <div
          style={{
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {activity.price.amount && activity.price.currencyCode && (
            <Typography variant="h4" color="text.secondary" gutterBottom>
              {formatCurrency(
                activity.price.amount,
                activity.price.currencyCode
              )}
            </Typography>
          )}
          <Rating
            value={parseFloat(activity.rating)}
            readOnly
            precision={0.5}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TourActivityCard;
