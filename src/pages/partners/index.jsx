import { useState } from "react";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { Flex, Text, Tr } from "@chakra-ui/react";
import Filter from "../../components/Filter";
import { useQuery } from "react-query";
import { getPartners } from "./service";
import FullPageLoader from "../../components/FullPageLoader";
import { CreatePartnerModal } from "./components/CreatePartnerModal";

export default function Partners() {
  const [filterBy, setFilterBy] = useState(null);
  const [skip, setSkip] = useState(0);
  const { data: partnersData = [] } = useQuery({
    queryKey: ["partners", skip],
    queryFn: () => getPartners(skip),
  });
  console.log(partnersData);
  return (
    <>
      <Flex alignItems={"center"} justifyContent={"space-between"} mb="40px">
        <Filter
          searchPlaceholder={"Search Partner"}
          searchFilter={"name"}
          filters={["noOfDeliveries"]}
          filterBy={setFilterBy}
          info={partnersData}
          mb="0"
        />
        {/* <OverviewCard title={"Active Drivers"} value="9"> */}
        <CreatePartnerModal mb="20px" />
        {/* </OverviewCard> */}
      </Flex>
      <CustomTable head={partnersTableHead}>
        {partnersData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          ?.map((data) => (
            <Tr key={data?._id}>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.name}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.phone}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.email}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.address}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.noOfDeliveries}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.totalTrucks}</Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      {!filterBy && (
        <CustomTable.Pagination
          length={partnersData?.length}
          updateTable={(page) => {
            setSkip(page * DATA_ROWS.LIMIT /*limit */);
          }}
        />
      )}
    </>
  );
}

const partnersTableHead = [
  "Name",
  "Phone Number",
  "Email Address",
  "Address",
  "Number of Deliveres",
  "Number of Trucks",
];
