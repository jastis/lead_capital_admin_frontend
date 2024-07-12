import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function FormInput({ label, name, handleChange ,value, type, ...props }) {
  return (
    <FormControl>
      <FormLabel fontSize={".86em"}>{label}</FormLabel>
      <Input 
      type={type} 
      name={name}
      value={value}
      onChange={handleChange}
      {...props} />
    </FormControl>
  );
}

export default FormInput;
