import { Flex, Stack } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RequestDetails from "../pages/requests/components/RequestDetails";
import { lazy } from "react";

import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import AssignRequestDetails from "../pages/requests/components/AssignRequestDetails";
import { useGetState } from "../GlobalStateContext/useGetState";
import { getAdminDetails } from "../pages/login/service/admin";
import FullPageLoader from "./FullPageLoader";
import Financials from "../pages/financials";
import Partners from "../pages/partners";
import Companies from "../pages/companies";
import Customers from "../pages/customers";
import Support from "../pages/support/index";
import Dashboard from "../pages/dashboard";
import Requests from "../pages/requests";
import Settings from "../pages/settings";
import Trips from "../pages/trips";
import TripDetails from "../pages/trips/components/TripDetails";
import { useQuery } from "react-query";
import Invoices from "../pages/invoice";
import InvoiceDetails from "../pages/invoice/InvoiceDetails";
import Navigations from "..//pages/settings/components/tabs/Notifications";
import Notification from "../pages/notification/index"
// import Transaction from "../pages/transactions/index"
// import trucks from "../pages/transport-control/sub-pages/trucks/index"

function AuthenticatedRoutes() {
  const { setState = {} } = useGetState();
  const { isLoading } = useQuery(["admin"], getAdminDetails, {
    onSuccess: (data) => {
      setState(data);
    },
    onError: (error) => {
      console.error("ERROR", error);
    },
  });

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <BrowserRouter>
      <Flex flexDir={"row"} bg="#F6F6F6">
        <Sidebar w="16%" />
        <Stack w={["100%", "100%", "100%"]}>
          <Navigation />
          <Flex flexDir={"column"} p={["20px 10px", "20px 60px"]}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/notification" element={<Notification />} />

              <Route path="/trips" element={<Trips />} />

              <Route path="/trips/:id" element={<TripDetails />} />
              <Route path="/financials" element={<Financials />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route
                path="/invoices/invoice-details"
                element={<InvoiceDetails />}
              />

              <Route path="/support" element={<Support />} />

              <Route path="/settings" element={<Settings />} />
              <Route path="/navigations" element={<Navigations />} />

              {/* <Route path="/transactions" element={<Transactions />} /> */}
              <Route path="/companies" element={<Companies />} />
              <Route path="/customers" element={<Customers />} />

              <Route path="/requests" element={<Requests />} />
              <Route
                path="/requests/assign/*"
                element={<AssignRequestDetails />}
              />
              <Route path="/requests/detail/:id" element={<RequestDetails />} />
              <Route path="/*" element={<Dashboard />} />
            </Routes>
          </Flex>
        </Stack>
      </Flex>
    </BrowserRouter>
  );
}

export default AuthenticatedRoutes;
