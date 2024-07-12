import { Flex, Text, Avatar, Box } from "@chakra-ui/react";
import { BiChevronLeft } from "react-icons/bi";
import { HiOutlinePhone } from "react-icons/hi2";

import { PiCopyLight } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { _COLORS } from "../../../constant";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { errorNotifier, successNotifier } from "../../../components/notifier";

function TripDetails() {
  const navigate = useNavigate();
  const { state: trip } = useLocation();
  console.log(trip);
  return (
    <Flex flexDir={"column"}>
      <Flex
        flexDir={"row"}
        alignItems="center"
        gap="10px"
        mb="20px"
        cursor={"pointer"}
        onClick={() => navigate(-1)}
      >
        <BiChevronLeft fontSize={"1.5em"} />
        <Text fontWeight={"500"}>Back</Text>
      </Flex>

      <Flex
        flexDir={["column", "row"]}
        alignItems={"flex-start"}
        justifyContent="space-between"
        gap="20px"
      >
        <Flex flexDir={"column"} gap="20px" w="100%">
          <Map />
          <Flex
            flexDir={["column", "row"]}
            alignItems={"flex-start"}
            gap="20px"
          >
            <TrackingHistory data={trip} />
            <OrderDetails data={trip} />
            <CompanyDetails data={trip} />
          </Flex>
        </Flex>

        <Flex flexDir={"column"} gap="20px" w="100%" maxW={["100%", "300px"]}>
          <DriverDetails data={trip} />
          <DeliveryDetails data={trip} />
          <CustomerDetails data={trip} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TripDetails;

export const Map = () => {
  return (
    <>
      <style>
        {`
      .leaflet-container {
        width: 100%;
        height: 300px;
      }
        `}
      </style>
      {/* <div */}
      {/* <div id="map"></div> */}
      <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </>
  );
};

export const TrackingHistory = ({ data }) => {
  return (
    <Flex w="100%" h="100px" bg="#fff" borderRadius={"4px"} p="10px">
      <Text fontFamily={"Montserrat"} fontWeight="bold">
        Tracking History
      </Text>
    </Flex>
  );
};

export const CompanyDetails = ({ data }) => {
  console.log(data, "{");
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" borderRadius={"4px"} p="10px">
      <Text fontFamily={"Montserrat"} fontWeight="bold" mb="20px">
        Company Details
      </Text>
      <Box mb="20px">
        <Text color="#7E7C73" fontSize={".86em"}>
          Company Name
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.companyId?.name}
        </Text>
      </Box>
      <Box mb="20px">
        <Text color="#7E7C73" fontSize={".86em"}>
          Email
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.companyId?.email}
        </Text>
      </Box>
      <Box mb="20px">
        <Text color="#7E7C73" fontSize={".86em"}>
          Address
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.companyId?.address}
        </Text>
      </Box>
      <Box mb="20px">
        <Text color="#7E7C73" fontSize={".86em"}>
          Phone Number
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.companyId?.phone}
        </Text>
      </Box>
    </Flex>
  );
};

export const OrderDetails = ({ data }) => {
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Order Details
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Truck Make
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.personel?.truck?.make}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Truck Model
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.personel?.truck?.model}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Truck Type
        </Text>
        <Flex alignItems={"center"} gap="10px">
          <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
            {data?.personel?.truck?.truckType}
          </Text>
          <PiCopyLight color={"#628BF5"} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export const DriverDetails = ({ data }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.personel?.driver?.mobile).then(
      () => {
        console.log("content copied");
        successNotifier("copied sucessfully");
      },
      () => {
        errorNotifier("Failed to copy");
      }
    );
  };
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Driver's Details
        </Text>
      </Flex>
      <Flex alignItems={"center"} gap="10px">
        <Avatar
          borderRadius={"md"}
          name="Kent Dodds"
          src="https://bit.ly/kent-c-dodds"
          size="lg"
        />
        <Flex flexDir={"column"}>
          <Text fontWeight={"600"} fontSize=".86em">
            {data?.personel?.driver?.firstName}{" "}
            {data?.personel?.driver?.lastName}
          </Text>
          <Flex alignItems={"center"} gap="10px">
            <Text fontWeight={"600"} fontSize=".86em">
              {data?.personel?.driver?.mobile}
            </Text>
            <PiCopyLight color={"#628BF5"} onClick={copyToClipboard} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export const DeliveryDetails = ({ data }) => {
  return (
    <Flex w="100%" bg="#fff" flexDir={"column"} p="20px">
      <Text fontWeight="700" fontSize={".86em"} color="#000" mb="20px">
        Delivery Details
      </Text>

      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Pickup Location
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.requestId?.pickUpAddress}
        </Text>
        <Text color="#7E7C73" fontSize={".86em"} mt="20px">
          Delivery Location
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.requestId?.deliveryLocation}
        </Text>
      </Flex>
    </Flex>
  );
};

export const CustomerDetails = ({ data }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.requestId?.customerId?.phone).then(
      () => {
        console.log("content copied");
        successNotifier("copied sucessfully");
      },
      () => {
        errorNotifier("Failed to copy");
      }
    );
  };
  return (
    <Flex flexDir={"column"} w="100%" bg="#fff" p="20px">
      <Flex alignItems="center" gap="10px" mb="20px">
        <Text fontWeight="700" fontSize={".86em"} color="#000">
          Customer Details
        </Text>
      </Flex>
      <Flex flexDir={"column"}>
        <Text color="#7E7C73" fontSize={".86em"}>
          Name
        </Text>
        <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
          {data?.requestId?.customerId?.name}
        </Text>
        <Text color="#7E7C73" mt="20px" fontSize={".86em"}>
          Phone number
        </Text>
        <Flex alignItems={"center"} gap="10px">
          <Text color={_COLORS.black} fontWeight="500" fontSize={".86em"}>
            {data?.requestId?.customerId?.phone}
          </Text>
          <PiCopyLight color={"#628BF5"} onClick={copyToClipboard} />
        </Flex>
      </Flex>
    </Flex>
  );
};
