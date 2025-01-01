import { useEffect } from "react";
import ReactGA from "react-ga4";

const Analytics = ({ page, title }) => {
  useEffect(() => {
    ReactGA.initialize("G-GM6CHRVCPH");
  }, []);

  // Send pageview with a custom path
  ReactGA.send({
    hitType: "pageview",
    page,
    title,
  });
};

export default Analytics;
