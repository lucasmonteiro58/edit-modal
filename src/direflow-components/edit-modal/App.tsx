/* eslint-disable @typescript-eslint/camelcase */
import React, { FC, useState, useContext } from "react";
import styles from "./App.css";
import EditModal from "./components/EditModal";
import { Email, Endereco, Telefone } from "./context/UserInterfaces";
import { EventContext } from "direflow-component";
import { Styled } from "direflow-component";

interface IProps {
  userData: {
    email: Email;
    telefone: Telefone;
    endereco: Endereco;
    pessoa_id: number;
  };
  showPassword: boolean;
}

const dadosExemplo = {
  email: {
    email: "",
    id: 0,
    principal: "",
  },
  endereco: {
    bairro: "",
    cep: "",
    cidade: "",
    complemento: "",
    estado: "",
    id: 0,
    logradouro: "",
    numero: "",
    pessoa_id: 0,
    principal: "",
    tipo_logradouro_id: 0,
    tipo_logradouro_print: "",
  },
  pessoa_id: 50027,
  telefone: {
    ddd: "",
    fone: "",
    id: 0,
    principal: "",
    validado: true,
  },
};

const App: FC<IProps> = (props) => {
  const [editModalVisible, setEditModalVisible] = useState(true);
  const dispatch = useContext(EventContext);

  const eventClose = () => {
    const event = new CustomEvent("event-close");
    dispatch(event);
  };

  return (
    <Styled styles={styles}>
      <EditModal
        close={() => {
          eventClose();
          setEditModalVisible(false);
        }}
        visible={editModalVisible}
        actionPrincipal={() => {
          setEditModalVisible(false);
        }}
        data={props.userData}
        showPassword={props.showPassword}
      />
    </Styled>
  );
};

App.defaultProps = {
  userData: dadosExemplo,
  showPassword: false,
};

export default App;
