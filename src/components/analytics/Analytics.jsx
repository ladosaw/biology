import ReactGA from "react-ga4";

const initializeAnalytics = () => {
  ReactGA.initialize("G-GM6CHRVCPH");
};

const trackPageView = (
  path = window.location.pathname,
  title = "Page View"
) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title,
  });
};

export { initializeAnalytics, trackPageView };
