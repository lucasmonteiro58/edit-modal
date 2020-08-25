/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useContext } from "react";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { MdClose } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Email, Endereco, Telefone } from "../../context/UserInterfaces";
import Input from "../Form/Input";
import CreatableSelect from "../Form/Select";
import TokenModal from "../../components/TokenModal";
import Modal from "../../components/Modal";
import { listaLogradouro } from "./const";

import {
  postEndereco,
  postEmail,
  postTelefone,
  putEndereco,
  disableEmail,
  getAddressByCep,
  getTipoLogradouro,
  checkTelephoneIsValid,
  sendTelephoneToken,
  validateTelephone,
  enviarBoasVindas,
} from "../../services/api";
import { onlyNumbers } from "../../utils/phoneFormatter";
import styles from "./styles.css";
import { Styled } from "direflow-component";
import { EventContext } from "direflow-component";

interface FormData {
  endereco: {
    cep: string;
    tipo: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  email: {
    email: string;
  };
  telefone: {
    ddd: string;
    fone: string;
  };
}

export interface ModalProps {
  visible: boolean;
  actionPrincipal(): void;
  close(): void;
  data: {
    email: Email;
    telefone: Telefone;
    endereco: Endereco;
    pessoa_id: number;
  };
  showPassword: boolean;
}

const EditModal: React.FC<ModalProps> = ({
  visible,
  actionPrincipal,
  close,
  data,
  showPassword,
}) => {
  const formRef = useRef<FormHandles>(null);

  const [tokenModalVisible, setTokenModalVisible] = useState(false);
  const [tokenModalTelefone, setTokenModalTelefone] = useState("");
  const [tokenModalCode, setTokenModalCode] = useState("");
  const [editPasswordVisibility, setEditPasswordVisibility] = useState(false);

  // const [biometriaCadastrar, setBiometriaCadastrar] = useState(false);
  // const [biometriaConfirmar, setBiometriaConfirmar] = useState(false);

  const [pessoaId, setPessoaId] = useState(data?.pessoa_id);
  const [enderecoId, setEnderecoId] = useState(data?.endereco?.id);
  const [emailId, setEmailId] = useState(data?.email?.id);
  const [telefoneId, setTelefoneId] = useState(data?.telefone?.id);

  const [tiposLogradouros, setTiposLogradouros] = useState([]);

  const [loadingRequest, setLoadingRequest] = useState(false);
  const [modalSucessVisible, setModalSucessVisible] = useState(false);
  const [modalErrorVisible, setModalErrorVisible] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [currentPasswordRepeat, setCurrentPasswordRepeat] = useState("");
  const [passwordEquals, setPasswordEquals] = useState(true);
  const [passwordEqualsVisibility, setPasswordEqualsVisibility] = useState(
    false
  );

  const [currentCep, setCurrentCep] = useState(data?.endereco?.cep);
  const [currentDDD, setCurrentDDD] = useState(data?.telefone?.ddd);
  const [currentFone, setCurrentFone] = useState(data?.telefone?.fone);
  const [currentTipoLogradouro, setCurrentTipoLogradouro] = useState(
    data?.endereco?.tipo_logradouro_id
  );

  const [cepIsValid, setCepIsValid] = useState(true);
  const dispatch = useContext(EventContext);

  const verifyPasswordEquals = (v: string) => {
    setCurrentPasswordRepeat(v);
    if (currentPasswordRepeat.length === currentPassword.length) {
      if (currentPassword === currentPasswordRepeat) {
        setPasswordEquals(true);
      } else {
        setPasswordEquals(false);
      }
    }
  };

  const eventSuccess = () => {
    const event = new CustomEvent("event-success");
    dispatch(event);
  };

  const eventError = () => {
    const event = new CustomEvent("event-error");
    dispatch(event);
  };

  const handleSubmit: SubmitHandler<FormData> = async (dataSubmit) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    enviarDados(formRef.current?.getData() as FormData);
  };

  const enviarSmsBoasVindas = async () => {
    const telefoneCompleto = `${currentDDD}${currentFone}`;
    try {
      const response = await enviarBoasVindas(pessoaId, telefoneCompleto);
      if (response.data.success) {
        console.log("Enviado boas vindas");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cadastrarEndereco = async (endereco: object) => {
    if (enderecoId) {
      //await postEndereco(pessoaId, endereco);
      await putEndereco(enderecoId, endereco);
    } else {
      await postEndereco(pessoaId, endereco);
    }
  };

  const cadastrarEmail = async (email: object) => {
    const dataSubmit = formRef.current?.getData() as FormData;
    if (emailId) {
      //await putEmail(emailId, email);
      await postEmail(pessoaId, email);
    } else if (dataSubmit.email.email !== "") {
      await postEmail(pessoaId, email);
    }
  };

  const cadastrarTelefone = async (ddd: string, fone: string) => {
    if (telefoneId) {
      // await putTelefone(telefoneId, ddd, fone);
      await postTelefone(pessoaId, ddd, fone);
    } else {
      await postTelefone(pessoaId, ddd, fone);
    }
  };

  const enviarDados = async (dataSubmit: FormData) => {
    const telefoneCompleto = `${currentDDD}${currentFone}`;

    //verificar se o telefone é válido
    const onSubmitCheckTelefone = await checkTelephoneIsValid(
      pessoaId,
      telefoneCompleto
    );

    if (onSubmitCheckTelefone) {
      setLoadingRequest(true);
      try {
        await cadastrarTelefone(currentDDD, currentFone);
        const tempEndereco = dataSubmit.endereco;
        Object.assign(tempEndereco, {
          tipo_logradouro_id: Number(currentTipoLogradouro),
        });
        await cadastrarEndereco(tempEndereco);
        if (emailId && dataSubmit.email.email === "") {
          await disableEmail(emailId);
        } else {
          await cadastrarEmail(dataSubmit.email);
        }
        await enviarSmsBoasVindas();
        setModalSucessVisible(true);
        eventSuccess();
      } catch (error) {
        setModalErrorVisible(true);
        eventError();
        console.log(error.response.data.message);
      }
      setLoadingRequest(false);
    } else {
      setTokenModalTelefone(telefoneCompleto);
      const codeToken = await sendTelephoneToken(pessoaId, telefoneCompleto);

      if (codeToken) {
        console.log("codeToken: ", codeToken);
        setTokenModalCode(codeToken);
        setTokenModalVisible(true);
      } else {
        setModalErrorVisible(true);
        eventError();
        return;
      }
    }
  };

  const aposValidarToken = async () => {
    setTokenModalVisible(false);
    const dataSubmit = formRef.current?.getData() as FormData;
    const telefoneCompleto = `${currentDDD}${currentFone}`;

    const verificandoTelefone = await validateTelephone(
      tokenModalCode,
      pessoaId,
      telefoneCompleto
    );

    if (verificandoTelefone.success) {
      setLoadingRequest(true);
      try {
        await cadastrarTelefone(currentDDD, currentFone);
        await cadastrarEmail(dataSubmit.email);
        const tempEndereco = dataSubmit.endereco;
        Object.assign(tempEndereco, {
          tipo_logradouro_id: Number(currentTipoLogradouro),
        });
        await cadastrarEndereco(tempEndereco);
        await enviarSmsBoasVindas();
        setModalSucessVisible(true);
        eventSuccess();
      } catch (error) {
        setModalErrorVisible(true);
        eventError();
      }
      setLoadingRequest(false);
    } else {
      setModalErrorVisible(true);
      eventError();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onChangeLogradouro = (value: any) => {
    setCurrentTipoLogradouro(value);
  };

  const resendToken = async () => {
    const telefoneCompleto = `${currentDDD}${currentFone}`;
    const codeToken = await sendTelephoneToken(pessoaId, telefoneCompleto);
    console.log("codeToken: ", codeToken);
    setTokenModalCode(codeToken);
  };

  const searchAddressByCep = async (value: string) => {
    setCurrentCep(onlyNumbers(value));
    if (value.length >= 8) {
      try {
        const adress = await getAddressByCep(value);
        formRef.current?.setData({
          ...formRef.current.getData(),
          endereco: {
            ...adress,
            estado: adress.uf,
            cidade: adress.local_nome,
            tipo_logradouro_id: adress.logradouro_tipo_id,
            numero: "",
            complemento: "",
          },
        });
        setCurrentTipoLogradouro(adress.logradouro_tipo_id);
        setCepIsValid(true);
      } catch (error) {
        setCepIsValid(false);
      }
    }
  };

  useEffect(() => {
    setPessoaId(data?.pessoa_id);
    setEnderecoId(data?.endereco?.id);
    setEmailId(data?.email?.id);
    setTelefoneId(data?.telefone?.id);
  }, [data]);

  useEffect(() => {
    setCurrentCep(data?.endereco?.cep);
    setCepIsValid(true);
  }, [data?.endereco?.cep, visible]);

  useEffect(() => {
    setCurrentDDD(data?.telefone?.ddd);
  }, [data?.telefone?.ddd, visible]);

  useEffect(() => {
    setCurrentFone(data?.telefone?.fone);
  }, [data?.telefone?.fone, visible]);

  useEffect(() => {
    const logradouros = async () => {
      try {
        const response = await getTipoLogradouro();
        setTiposLogradouros(response);
      } catch (error) {
        console.log(error);
      }
    };
    logradouros();
  }, []);

  useEffect(() => {
    formRef.current?.setData(data);
  }, [data]);

  return (
    <Styled styles={styles}>
      <section
        id="EditModal"
        className={modalSucessVisible || modalErrorVisible ? "none" : ""}
      >
        <div className="modal-content">
          <Form
            ref={formRef}
            className="modal-content"
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <h1 className="title">
              <span>Editar Informações</span>
              <MdClose onClick={close} />
            </h1>

            <div className="infos-line1">
              <Input
                id="ddd"
                name="telefone.ddd"
                label="DDD *"
                value={currentDDD}
                onChange={(e) => {
                  setCurrentDDD(onlyNumbers(e.target.value));
                }}
                required
                maxLength={2}
                minLength={2}
              />
              <Input
                id="telefone"
                name="telefone.fone"
                label="Celular *"
                maxLength={9}
                minLength={9}
                value={currentFone}
                onChange={(e) => {
                  setCurrentFone(onlyNumbers(e.target.value));
                }}
                required
              />
              <Input
                id="email"
                name="email.email"
                label="Email"
                type="email"
                autoFocus
              />
            </div>
            <div className="infos-line2">
              <Input
                id="cep"
                className={cepIsValid ? "" : "error-with-color"}
                label="CEP"
                name="endereco.cep"
                value={currentCep}
                onChange={(e) => searchAddressByCep(e.target.value)}
                onKeyUp={(e) => searchAddressByCep(e.currentTarget.value)}
                onBlur={(e) => {
                  searchAddressByCep(e.target.value);
                }}
                maxLength={8}
                minLength={8}
              />
              <div className="material-select">
                <select
                  className="material-select-content"
                  name="endereco.tipo_logradouro_id"
                  id="tipos-logradouro"
                  onChange={(e) => {
                    onChangeLogradouro(e.target.value);
                  }}
                  required
                >
                  {listaLogradouro.map((option, index) => (
                    <option
                      key={index}
                      value={option.id}
                      selected={option.id === currentTipoLogradouro}
                    >
                      {option.descricao}
                    </option>
                  ))}
                </select>
                <span className="material-select-highlight"></span>
                <span className="material-select-bar"></span>
                <label className="material-select-label">Tipo</label>
              </div>
              <Input
                id="logradouro"
                name="endereco.logradouro"
                label="Logradouro"
                required
              />
              <Input
                id="numero"
                name="endereco.numero"
                type="number"
                label="Nº"
                maxLength={6}
              />
            </div>
            <div className="infos-line3">
              <Input
                id="complemento"
                name="endereco.complemento"
                label="Complemento"
              />
              <Input id="bairro" name="endereco.bairro" label="Bairro" />
              <Input id="cidade" name="endereco.cidade" label="Cidade" />
              <Input id="estado" name="endereco.estado" label="UF" />
            </div>
            {showPassword && (
              <div className="infos-line0">
                {editPasswordVisibility ? (
                  <>
                    <Input
                      id="senha"
                      className={
                        !passwordEquals && passwordEqualsVisibility
                          ? "error-with-color"
                          : ""
                      }
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      onBlur={() => setPasswordEqualsVisibility(false)}
                      name="senha"
                      label="Nova senha"
                      type="password"
                    />
                    <Input
                      id="senhaRepetir"
                      className={
                        !passwordEquals && passwordEqualsVisibility
                          ? "error-with-color"
                          : ""
                      }
                      value={currentPasswordRepeat}
                      onChange={(e) => verifyPasswordEquals(e.target.value)}
                      onBlur={() => setPasswordEqualsVisibility(false)}
                      name="senha_repetir"
                      label="Repita a senha"
                      type="password"
                    />{" "}
                    <AiOutlineCloseCircle
                      title="Cancelar"
                      onClick={() => {
                        setEditPasswordVisibility(false);
                      }}
                    />
                    {!passwordEquals && passwordEqualsVisibility && (
                      <span className="passoword-nao-confere">
                        *Senhas não conferem!
                      </span>
                    )}
                  </>
                ) : (
                  <div
                    className="edit-senha-button"
                    onClick={() => {
                      setEditPasswordVisibility(true);
                    }}
                  >
                    Alterar Senha <AiFillEdit />
                  </div>
                )}
              </div>
            )}

            <div className="buttons-section">
              <button
                id="salvar"
                type="submit"
                className="success-button"
                disabled={loadingRequest}
              >
                {loadingRequest ? (
                  <img
                    src="https://livsaude.com.br/assets/totem/spinner.svg"
                    alt="spinner"
                  />
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </Form>
        </div>
        <TokenModal
          close={() => {
            setTokenModalVisible(false);
          }}
          visible={tokenModalVisible}
          actionPrincipal={() => {
            aposValidarToken();
          }}
          actionSecondary={() => {
            setTokenModalVisible(false);
          }}
          number={tokenModalTelefone}
          code={tokenModalCode}
          resendCode={resendToken}
        />
        <Modal
          buttonPrincipalText="Prosseguir"
          message="Seus dados foram atualizados com sucesso!"
          visible={modalSucessVisible}
          actionPrincipal={() => {
            setModalSucessVisible(false);
            close();
          }}
        />
        <Modal
          buttonPrincipalText="Voltar"
          message="Ocorreu um erro ao salvar os dados!"
          isError
          visible={modalErrorVisible}
          actionPrincipal={() => {
            setModalErrorVisible(false);
          }}
        />
      </section>
    </Styled>
  );
};

export default EditModal;
