import { Box, Flex } from "@chakra-ui/react";
import { AllCards } from "./components/AllCards";
import { TripsCard } from "./components/TripsCard";
import { _COLORS } from "../../constant";
import { RentCard } from "./components/RentCard";
import {
  getAnalytics,
  getIncomeAnalytics,
  getTripsAnalytics,
} from "./services";
import { useQuery } from "react-query";
import FullPageLoader from "../../components/FullPageLoader";
import axiosInstance from "../../service/api";

function Dashboard() {
  const { data: analyticsData = [], isLoading } = useQuery({
    queryKey: ["analytics"],
    queryFn: getAnalytics,
  });
  const { data: tripsAnalytics = [] } = useQuery({
    queryKey: ["tripsAnalytics"],
    queryFn: getTripsAnalytics,
  });
  const { data: incomeAnalytics = [] } = useQuery({
    queryKey: ["incomeAnalytics"],
    queryFn: getIncomeAnalytics,
  });

  const { data: totalIncome = [] } = useQuery({
    queryKey: ["totalIncome"],
    queryFn: () => axiosInstance.get("/analytics/monthly-income"),
  });

  const totalIncomeAnalytics =
    totalIncome?.data?.data?.totalIncome?.[0]?.totalIncome;

  return isLoading ? (
    <FullPageLoader />
  ) : (
    <>
      <Box>
        <Flex
          justify={"space-between"}
          direction={["column", "column", "column", "row"]}
          gap={["20px", "20px", "20px", "0px"]}
        >
          <AllCards
            data={{ ...analyticsData, totalIncome: totalIncomeAnalytics }}
          />
          <Box
            w={["100%", "100%", "100%", "55%"]}
            bg={_COLORS.white}
            rounded={"md"}
            shadow={"sm"}
            p={"20px"}
          >
            <TripsCard data={tripsAnalytics} />
          </Box>
        </Flex>
        <Box
          w={"100%"}
          bg={_COLORS.white}
          rounded={"md"}
          shadow={"sm"}
          p={"20px"}
          mt={"25px"}
        >
          <RentCard data={incomeAnalytics} />
        </Box>
      </Box>
    </>
  );
}

export default Dashboard;
