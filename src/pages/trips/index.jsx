import { Text, Tr } from "@chakra-ui/react";
import { _COLORS } from "../../constant";
import CustomTable, { DATA_ROWS } from "../../components/CustomTable";
import { TopSection } from "./TopSection";
import { useNavigate } from "react-router-dom";
import { getTrips } from "./service/trip";
import { useQuery } from "react-query";
import FullPageLoader from "../../components/FullPageLoader";
import { useState } from "react";
import Filter from "../../components/Filter";

function Trips() {
  const [filterBy, setFilterBy] = useState(null);

  const navigate = useNavigate();
  const [skip, setSkip] = useState(0);
  const { data: tripData = [] } = useQuery({
    queryKey: ["trip", skip],
    queryFn: () => getTrips(skip),
  });

  console.log("tripData", tripData);

  return (
    <>
      <TopSection data={tripData} />
      <Filter
        searchPlaceholder={"Search Trips"}
        searchFilter={"name"}
        filters={["noOfDeliveries"]}
        filterBy={setFilterBy}
        info={tripData}
        mb="20px"
      />

      {console.log(tripData, "{{}}}")}
      <CustomTable head={r}>
        {tripData
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          ?.map((data, index) => (
            <Tr
              key={index}
              onClick={() => navigate(`/trips/${data?._id}`, { state: data })}
              cursor={"pointer"}
            >
              {console.log(data, "::")}
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.tripId}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.companyId?.name}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.personel?.driver?.firstName}{" "}
                  {data?.personel?.driver?.lastName}
                </Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>
                  {data?.requestId?.deliveryLocation}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <Text
                  color={
                    data?.status.toLowerCase() === "delivered"
                      ? _COLORS.green
                      : data?.status.toLowerCase() === "active"
                      ? "#aaaa0f"
                      : _COLORS.red
                  }
                >
                  {data?.status}
                </Text>
              </CustomTable.Td>

              <CustomTable.Td>
                <Text
                  cursor={"pointer"}
                  // fontWeight={"bold"}
                  fontSize=".9em"
                  color={_COLORS.green}
                >
                  View Trip
                  {/* {data?.action} */}
                </Text>
              </CustomTable.Td>
            </Tr>
          ))}
      </CustomTable>
      <CustomTable.Pagination
        length={tripData?.length}
        updateTable={(page) => {
          setSkip(page * DATA_ROWS.LIMIT /*limit */);
        }}
      />
    </>
  );
}

export default Trips;

const r = [
  "Trip ID",
  "Transporter",
  "Driver",
  "Delivery address",
  "Status",
  "Action",
];
