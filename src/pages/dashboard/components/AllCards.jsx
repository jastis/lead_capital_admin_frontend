import { Box, Flex } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { BsTruck } from "react-icons/bs";
import { _COLORS } from "../../../constant";
import { Cards } from "./Cards";

export const AllCards = ({ data }) => {
  console.log(data, "daata");
  return (
    <Box w={["100%", "100%", "100%", "42%"]}>
      <Cards
        title="Total Income"
        amount={data?.totalIncome?.toLocaleString() || 0}
        bg={_COLORS.white}
        icon={<TbCurrencyNaira size={"1.4rem"} color={_COLORS.white} />}
        iconBg={_COLORS.brand}
        iconColor={_COLORS.white}
        NGN={"NGN"}
        width={"100%"}
      />

      <Flex justify={"space-between"} mt={"15px"} w={"100%"}>
        <Cards
          title="Total Paid Deposit to partners"
          amount={data?.totalPaidDepositToPartners?.toLocaleString() || "0"}
          bg={_COLORS.lighterGreen}
          icon={<TbCurrencyNaira size={"1.4rem"} />}
          iconBg={_COLORS.lightGreen}
          width={"49%"}
        />
        <Cards
          title="Total Balance for partners"
          amount={data?.TotalBalanceForPartners?.toLocaleString() || "0"}
          bg={_COLORS.ligherPink}
          icon={<TbCurrencyNaira size={"1.4rem"} />}
          iconBg={_COLORS.lightPink}
          width={"49%"}
        />
      </Flex>
      <Flex justify={"space-between"} mt={"15px"} w={"100%"}>
        <Cards
          title="Canceled Trips"
          amount={data?.totalCancelledTrips?.toLocaleString() || "0"}
          bg={_COLORS.lightOrange}
          icon={<BsTruck size={"1rem"} />}
          iconBg={_COLORS.orange}
          width={"49%"}
        />
        <Cards
          title="Total Trips"
          amount={data?.totalTrips?.toLocaleString() || "0"}
          bg={_COLORS.lighterGreen}
          icon={<BsTruck size={"1rem"} />}
          iconBg={_COLORS.lightGreen}
          width={"49%"}
        />
      </Flex>
      <Flex justify={"space-between"} mt={"15px"} w={"100%"}>
        <Cards
          title="Flag Trips"
          amount={data?.totalFlaggedTrips?.toLocaleString() || "0"}
          bg={_COLORS.lightYellow}
          icon={<BsTruck size={"1rem"} />}
          iconBg={_COLORS.yellow}
          width={"100%"}
        />
      </Flex>
    </Box>
  );
};
