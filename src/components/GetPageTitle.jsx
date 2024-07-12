export const getPageTitle = (pathname) => {
  switch (pathname) {
    case "/":
      return "Dashboard";

    case "/requests":
      return "Requests";

    case "/accepted-requests":
      return "Accepted Requests";

    case "/trips":
      return "Trips";

    case `/transactions`:
      return "Transactions";

    case "/transport-control":
      return "Transport Control";

    case "/transport-control/trucks":
      return "Transport Control > Trucks";
    case "/transport-control/issue-report":
      return "Transport Control > Issue Report";

    case "/settings":
      return "Settings";

    default:
      return "Details";
  }
};
