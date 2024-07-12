import { Td, Text, Tr } from "@chakra-ui/react";
import CustomTable from "../../components/CustomTable";
import { _COLORS } from "../../constant";
import Filter from "../../components/Filter";
import { useState } from "react";

function AcceptedRequests() {
  const [filterBy, setFilterBy] = useState(null);

  return (
    <>
      <Filter
        filters={["type", "status", "customer"]}
        filterBy={setFilterBy}
        info={s}
      />
      <CustomTable head={r}>
        {s
          ?.filter((data) => CustomTable.filterFunc(data, filterBy))
          .map((data) => (
            <Tr>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.type}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.customer}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.adr}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.truckReq}</Text>
              </CustomTable.Td>
              <CustomTable.Td>
                <Text {...CustomTable.style}>{data?.expDate}</Text>
              </CustomTable.Td>

              <Td>
                <Text
                  color={
                    data?.status.toLowerCase() === "accepted" ||
                    data?.status.toLowerCase() === "open" ||
                    data?.status.toLowerCase() === "active"
                      ? _COLORS.green
                      : _COLORS.red
                  }
                >
                  {data?.status}
                </Text>
              </Td>

              <CustomTable.Td>
                <CustomTable.ActionType type={2} />
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

export default AcceptedRequests;

const r = [
  "Truck type",
  "Customer",
  "Pick up Address",
  "Total Trucks Requested",
  "Expiry Date/Time",
  "Status",
  "Action",
];

const s = [
  {
    type: "80 Tons Open",
    customer: "Golden Penny",
    adr: "3,Salaudeen Close, off Agungi Road,Lagos,Nigeria",
    truckReq: "6 Trucks",
    expDate: "21,August 2023 04:09PM",
    status: "Open",
    id: 1,
  },
  {
    type: "80 Tons Open",
    customer: "Golden Penny",
    adr: "3,Salaudeen Close, off Agungi Road,Lagos,Nigeria",
    truckReq: "6 Trucks",
    expDate: "21,August 2023 04:09PM",
    status: "Open",
    id: 3,
  },
  {
    type: "120 Tons Open",
    customer: "Mama Gold",
    adr: "3,Salaudeen Close, off Agungi Road,Lagos,Nigeria",
    truckReq: "19 Trucks",
    expDate: "22,August 2023 04:09PM",
    status: "Close",
    id: 2,
  },
  // {
  //   type: "100 Tons Open",
  //   customer: "Golden Penny",
  //   adr: "3,Salaudeen Close, off Agungi Road,Lagos,Nigeria",
  //   truckReq: "6 Trucks",
  //   expDate: "21,August 2023 04:09PM",
  //   status: "Open",
  //   id: 3,
  // },
  // {
  //   type: "100 Tons Open",
  //   customer: "Golden Penny",
  //   adr: "3,Salaudeen Close, off Agungi Road,Lagos,Nigeria",
  //   truckReq: "6 Trucks",
  //   expDate: "21,August 2023 04:09PM",
  //   status: "Open",
  //   id: 4,
  // },
];
