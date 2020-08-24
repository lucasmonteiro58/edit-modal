import React, { useRef, useEffect } from "react";
import ReactSelect, {
  OptionTypeBase,
  Props as SelectProps,
} from "react-select";
import { useField } from "@unform/core";
interface Props extends SelectProps<OptionTypeBase> {
  name: string;
}

interface State {
  ariaLiveSelection: string;
  ariaLiveContext: string;
  inputIsHidden: boolean;
  isFocused: boolean;
  isComposing: boolean;
  isSelected: boolean;
}
export const customStyles = {
  option: (provided: object, state: State) => ({
    ...provided,
    padding: 3,
    color: state.isSelected ? "white" : "black",
    backgroundColor: state.isSelected ? "#28ac9d" : "",
    fontSize: "24px",
  }),
  control: (provided: object, state: State) => ({
    ...provided,
    outline: 0,
    border: "none",
    borderRadius: 0,
    borderBottom: state.isFocused ? "2px solid" : "2px solid",
    borderBottomColor: "#0000008a",
    boxShadow: "none",
    fontSize: "28px",
    marginTop: "8px",
  }),
  input: (provided: object) => ({
    ...provided,
  }),
  menu: (provided: object) => ({
    ...provided,
    zIndex: 9999,
  }),
};

const CreatableSelect: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref: any) => {
        if (rest.isMulti) {
          if (!ref.state.value.id) {
            return [];
          }
          return ref.state.value.id.map(
            (option: OptionTypeBase) => option.value
          );
        }
        if (!ref.state.value.id) {
          return "";
        }
        return ref.state.value.id;
      },
    });
  }, [fieldName, registerField, rest.isMulti]);
  return (
    <ReactSelect
      id={name}
      defaultValue={defaultValue}
      ref={selectRef}
      classNamePrefix="react-select"
      styles={customStyles}
      {...rest}
    />
  );
};
export default CreatableSelect;
