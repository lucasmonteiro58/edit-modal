import { useField } from "@unform/core";
import React, { useEffect, useRef } from "react";
import ReactInputMask, { Props as MaskProps } from "react-input-mask";

interface Props extends MaskProps {
  name: string;
  label?: string;
}
// type InputProps = JSX.IntrinsicElements["input"] & Props;
const InputMask: React.FC<Props> = ({ name, label, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField /* error */ } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: inputRef.current,
      setValue(ref: any, value: string) {
        ref.setInputValue(value);
      },
      clearValue(ref: any) {
        ref.setInputValue("");
      },
    });
  }, [fieldName, registerField]);
  return (
    <div className="material-input">
      <label>
        <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest} />
        <span className="placeholder">{label}</span>
      </label>
    </div>
  );
};
export default InputMask;
