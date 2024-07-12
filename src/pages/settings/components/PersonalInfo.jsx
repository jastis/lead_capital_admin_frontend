import { Box, Flex, FormLabel, HStack, Image, Input, Spinner, Text } from "@chakra-ui/react";
import profilePic from "../../../assets/profilePic.png";
import { _COLORS } from "../../../constant";
import camera from "../../../assets/camera.png";
import { useGetState } from "../../../GlobalStateContext/useGetState";
import { useState} from "react"
import { updateAccount } from "../service/settings";

const PersonalInfo = () => {
  const [loading, setLoading] = useState(false);
  
 
   const handleChange = async (e) => {
     console.log(e.target.files?.[0], "fanda");
     setLoading(true);
     const formData = new FormData();
     formData.append("image", e.target.files?.[0]);
     await updateAccount( formData, setLoading);
   };

    const { state } = useGetState();
    console.log(state,"opr")
  return (
    <Box
      padding="50px 30px"
      bgColor={_COLORS.white}
      borderRadius="10px"
      width={["100%", "30%"]}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        w={"100%"}
        position="relative"
        zIndex={0}
      >
        <HStack>
          <Image
            src={state?.image}
            width="114px"
            height="114px"
            borderRadius="50%"
            position="relative"
          />
          <FormLabel htmlFor="profile-pic" borderRadius={"50%"}>
            {" "}
            <Image
              // onClick={handleClick}
              src={camera}
              bg={_COLORS?.brand}
              p="5px"
              w="30px"
              h="30px"
              borderRadius="50%"
              position="absolute"
              left="150px"
              top="10px"
              cursor="pointer"
            />
          </FormLabel>
          <Input
            display={"none"}
            type="file"
            id="profile-pic"
            onChange={handleChange}
          />

          {loading && (
            <Box position={"absolute"} top="11%" left="8%" zIndex={1000}>
              <Spinner
                thickness="3px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="md"
              />
            </Box>
          )}
        </HStack>
      </Flex>
      {/* <Flex justifyContent="center" mb="20px" position="relative" zIndex={0}>
        <Image src={state?.image} width="114px"
                height="114px"
                borderRadius="50%"/>
        <Box position="absolute" top="10px">
          <Image src={camera} cursor="pointer"/>
        </Box>
      </Flex> */}

      <Box textAlign="center">
        <Text
          color={_COLORS.primaryBtn}
          fontSize="24px"
          fontWeight="bold"
          mb="10px"
        >
          {state?.fullName || "N/A"}
        </Text>
        <Text fontSize="16px" fontWeight="semibold" color="#7E7C73">
          {state?.email}
        </Text>
        <Text fontSize="16px" fontWeight="semibold" color="#7E7C73">
          {state?.phoneNumber}
        </Text>
      </Box>
    </Box>
  );
};

export default PersonalInfo;
