import { Flex, Text, Tr } from "@chakra-ui/react";
import CustomTable from "../../components/CustomTable";
import OverviewCard from "../../components/OverviewCard";
import { _COLORS } from "../../constant";
import Filter from "../../components/Filter";
import { useState } from "react";

function Transactions() {
  const [filterBy, setFilterBy] = useState(null);
  return (
    <>
      <Filter
        filters={["status", "nameOfCompany"]}
        filterBy={setFilterBy}
        info={s}
      />
      <Flex
        flexDir={["column", "row"]}
        alignItems="center"
        gap={["5px", "20px"]}
      >
        <OverviewCard
          icon={"₦"}
          title={"Total Earnings"}
          value="NGN 545,098,000.00"
        />
        <OverviewCard
          icon={"₦"}
          title={"Total Trips"}
          value="62"
          color={"#FED93D"}
        />
      </Flex>
      <CustomTable head={r}>
        {s
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          .map((data) => (
            <Tr>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.tripId}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.nameOfCompany}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.totalAmount}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.depositAmount}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.balance}</Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <Text
                  color={
                    data?.status?.toLowerCase() === "completed"
                      ? _COLORS.green
                      : _COLORS.red
                  }
                >
                  {data?.status}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <CustomTable.ActionType type={3} />
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      {!filterBy && (
        <CustomTable.Pagination
          length={10}
          total={50}
          updateTable={async (page) => null}
        />
      )}
    </>
  );
}

export default Transactions;

const r = [
  "Trip ID",
  "Name of Company",
  "Total Amount (₦)",
  "Deposit Amount(₦)",
  "Balance(₦)",
  "Status",
  "Action",
];

const s = [
  {
    tripId: "#4356UH",
    nameOfCompany: "Golden Penny",
    totalAmount: "200,000",
    depositAmount: "145,000",
    balance: "54,400",
    status: "Completed",
    id: 0,
  },
  {
    tripId: "#4356UH",
    nameOfCompany: "Mama Gold",
    totalAmount: "200,000",
    depositAmount: "145,000",
    balance: "54,400",
    status: "Pending",
    id: 1,
  },
  {
    tripId: "#4356UH",
    nameOfCompany: "Mama Gold",
    totalAmount: "200,000",
    depositAmount: "145,000",
    balance: "54,400",
    status: "Pending",
    id: 1,
  },
];
