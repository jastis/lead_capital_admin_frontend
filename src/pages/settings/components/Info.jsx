import { Box, Flex } from "@chakra-ui/react";
import GeneralInformation from "./GeneralInformation";
import PersonalInfo from "./PersonalInfo";

function Info() {
  return (
    <Box width="100%" mt="20px">
      <Flex
        flexDir={["column", "row"]}
        width="100%"
        gap={["20px", "0"]}
        justifyContent="space-between"
      >
        <PersonalInfo />
        <GeneralInformation />
      </Flex>
    </Box>
  );
}

export default Info;
