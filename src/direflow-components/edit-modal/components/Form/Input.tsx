import { useField } from "@unform/core";
import React, { useEffect, useRef } from "react";
interface Props {
  name: string;
  label?: string;
}
type InputProps = JSX.IntrinsicElements["input"] & Props;
const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField /* error */ } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      path: "value",
      ref: inputRef.current,
    });
  }, [fieldName, registerField]);
  return (
    <div className="material-input">
      <label>
        <input
          autoComplete="off"
          id={name}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
          placeholder=" "
        />
        <span className="placeholder">{label}</span>
      </label>
    </div>
  );
};
export default Input;
