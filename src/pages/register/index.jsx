import { Button, Flex, Input as ChakraInput, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthBackgroundContainer } from "../../components/AuthBackgroundContainer";
import { SocialAuth } from "../../components/SocialAuth";
import { _COLORS } from "../../constant";

function Register() {
  return (
    <AuthBackgroundContainer>
      <Flex
        flexDir={"column"}
        alignSelf="stretch"
        px={["20px", "30px", "30px", "30px", "150px"]}
        gap="6px"
      >
        <Flex flexDir={"column"}>
          <Text fontFamily={"Montserrat"} fontWeight="700" fontSize="2.2em">
            Register Here
          </Text>
          <Text fontSize=".86em">Kindly input your details correctly</Text>
        </Flex>

        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Full Name</Text>
          <Input />
        </Flex>
        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Email Address</Text>
          <Input />
        </Flex>

        <Flex alignItems={"flex-start"} gap="10px">
          <Flex flexDir={"column"} fontSize=".86em" gap="10px">
            <Text> Enter Your Password</Text>
            <Input />
          </Flex>
          <Flex flexDir={"column"} fontSize=".86em" gap="10px">
            <Text> Re-enter Your Password</Text>
            <Input />
          </Flex>
        </Flex>

        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Company Name</Text>
          <Input />
        </Flex>
        <Flex flexDir={"column"} fontSize=".86em" gap="10px">
          <Text> Enter Your Phone Number</Text>
          <Input />
        </Flex>

        <Flex flexDir={"column"} gap="6px">
          <Button
            bg={_COLORS.brand}
            py="25px"
            color="#fff"
            _hover={{ background: `${_COLORS.brand}50` }}
            fontWeight="bold"
          >
            Sign Up
          </Button>
        </Flex>

        <Flex flexDir={"column"} gap="10px">
          <Text textAlign={"center"}>
            Already have an account ?{" "}
            <span style={{ color: _COLORS.brand, fontWeight: "bold" }}>
              <Link to="/">Log In</Link>{" "}
            </span>
          </Text>
          <Text textAlign={"center"} fontSize=".7em">
            Or{" "}
          </Text>

          {/* <SocialAuth /> */}
        </Flex>
      </Flex>
    </AuthBackgroundContainer>
  );
}

export const Input = ({ ...props }) => {
  return <ChakraInput {...props} _focusVisible={{ boxShadow: "none" }} />;
};

export default Register;
