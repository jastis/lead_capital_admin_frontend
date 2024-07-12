import React, {useState} from "react";
import { Flex } from "@chakra-ui/react";
import FormInput from "../../../components/FormInput";
import { CustomBtn } from "../../../components/CustomBtn";
import { _COLORS } from "../../../constant";
import { updateAccount } from "../service/settings";
import { useMutation, useQueryClient } from "react-query"; 

const UpdateInfoModal = () => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    companyName: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: updateNewAccount, isLoading } = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      onClose();
    },
  });
  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = { ...formData };
    updateNewAccount(payload);
  console.log(formData);
  };
  return (
    <Flex flexDir={"column"} gap="20px" px="10px" w="100%">
      {/* <Text color={_COLORS.brand} fontSize="24px" fontWeight="700" pb="30px">
        Update Information
      </Text> */}
      <FormInput 
      label="Enter Your Full Name" 
      name={"fullName"}
      value={formData.fullName}
      handleChange={handleInputChange}
      />
      <FormInput
       label="Enter Your Email Address"
       name={"email"}
       value={formData.email}
       handleChange={handleInputChange}
        />
      <FormInput
       label="Enter Your Phone Number" 
       name={"phoneNumber"}
       value={formData.phoneNumber}
       handleChange={handleInputChange}
       />
      <FormInput
       label="Enter Your Company Name" 
       name={"companyName"}
       value={formData.companyName}
       handleChange={handleInputChange}
       />
      <FormInput
       label="Enter Your Location"
       name={"location"}
       value={formData.location}
       handleChange={handleInputChange}
        />
      <CustomBtn text="Update" width="100%" height="50px" handleClick={handleUpdate}  loading={isLoading}/>
    </Flex>
  );
};

export default UpdateInfoModal;
