import React, {useState} from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CustomBtn } from "../../../components/CustomBtn";
import { _COLORS } from "../../../constant";
import FormInput from "../../../components/FormInput";
import { useMutation, useQueryClient } from "react-query"; 
import { updatePassword } from "../service/settings";

function ResetPassword() {
  const queryClient = useQueryClient();
  const [formValues, setFormValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: updateNewPassword, isLoading } = useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["updatePassword"] });
      onClose();
    },
  });
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    const payload = { ...formValues };
    updateNewPassword(payload);
  console.log(formValues);


  };
  return (
    <Box
      width="100%"
      bgColor={_COLORS.white}
      borderRadius="10px"
      padding={"50px 30px"}
      mt="20px"
    >
      <Text fontSize="16px" fontWeight="semibold">
        Reset Password
      </Text>
      <Text pt="30px" pb="10px">
        Please insert the required credentials below to update the password.
      </Text>
      <Box mb="30px" display={"flex"} flexDirection={["column", "row"]}>
        <FormInput
          width={["100%", "90%"]}
          type="text"
          placeholder="Current Password"
          name={"currentPassword"}
          value={formValues.currentPassword}
          handleChange={handleInputChange}
        />
        <FormInput
          width={["100%", "90%"]}
          type="text"
          placeholder="New Password"
          name={"newPassword"}
          value={formValues.newPassword}
          handleChange={handleInputChange}
        />
        <FormInput
          width={["100%", "90%"]}
          type="text"
          placeholder="Confirm New Password"
          name={"confirmPassword"}
          value={formValues.confirmPassword}
          handleChange={handleInputChange}
        />
      </Box>
      <CustomBtn
        fontSize="16px"
        text="save"
        height="50px"
        width={["100%", "360px"]}
        loading={isLoading}
        handleClick={handleUpdatePassword}
      />
    </Box>
  );
}

export default ResetPassword;
