import { useRef } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { CustomBtn } from "./CustomBtn";

export const FileInput = ({ setInputFile }) => {
  const { onClose } = useDisclosure();
  const labelRef = useRef();
  const inputRef = useRef();

  function upload(e) {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    setInputFile(file);
    inputRef.current.value = "";
  }

  return (
    <label
      htmlFor="bulk-upload"
      style={{ position: "relative" }}
      ref={labelRef}
    >
      <input
        ref={inputRef}
        type="file"
        id="bulk-upload"
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={upload}
        style={{ position: "absolute", width: "0" }}
      />

      <CustomBtn
        text="Upload"
        handleClick={() => {
          onClose();
          labelRef.current.click();
        }}
      />
    </label>
  );
};
