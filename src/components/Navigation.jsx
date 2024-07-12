import {
  Avatar,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AiOutlineAlignLeft, AiOutlineBell } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { GlobalStateContext } from "../GlobalStateContext/GlobalState";
import { getPageTitle } from "./GetPageTitle";
import { useGetState } from "../GlobalStateContext/useGetState";
import { useNavigate } from "react-router-dom";

function Navigation() {
  const navigate = useNavigate()
  const [width, setW] = useState("");
  const [mobile] = useMediaQuery("(max-width:480px)");
  const { setState } = useContext(GlobalStateContext);

  const { state } = useGetState();

  useEffect(() => {
    setW(document.getElementById("x")?.offsetWidth);
  }, []);

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <Flex w="100%" h="80px" position={"relative"} id="x">
      <Flex
        alignItems={"center"}
        position={"fixed"}
        top="0"
        bg="#fff"
        zIndex={1}
        p="20px 40px"
        w={width}
        h="80px"
        justifyContent={"space-between"}
        boxShadow="0px 3px 1px 0px #0000000d"
      >
        {mobile && (
          <AiOutlineAlignLeft
            fontSize={"1.5em"}
            cursor="pointer"
            onClick={() =>
              setState((prev) => ({
                toggle: !prev.toggle,
              }))
            }
          />
        )}
        <Text
          fontSize={["1em", "1.3em"]}
          fontFamily={"Montserrat"}
          fontWeight="700"
        >
          {getPageTitle(pathname)}
        </Text>

        <Flex alignItems={"center"} gap="20px">
          <AiOutlineBell cursor="pointer" fontSize={"2em"} onClick={()=>{
            navigate("/notification");
          }} />
          <Avatar size="md" name={state?.fullName} src={state?.image} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Navigation;
