import React, { useState, useEffect } from "react";
import "./styles.css";
import { phoneMask } from "../../utils/phoneFormatter";
import { MdRefresh } from "react-icons/md";

import styles from "./styles.css";
import { Styled } from "direflow-component";

export interface ModalProps {
  visible: boolean;
  actionPrincipal(): void;
  actionSecondary(): void;
  close?(): void;
  number: string;
  code: string;
  resendCode(): void;
}

const TokenModal: React.FC<ModalProps> = ({
  visible, // ocultar modal
  actionPrincipal,
  actionSecondary,
  close,
  resendCode,
  number,
  code,
}) => {
  const [codeInput, setCodeInput] = useState("");
  const [codeIsIncorrect, setCodeIsIncorrect] = useState(false);
  const [seconds, setSeconds] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const [tecladoOn, setTecladoOn] = useState(false);

  const verifyToken = () => {
    if (code === codeInput) {
      actionPrincipal();
    } else {
      setCodeIsIncorrect(true);
      console.log("Token incorreto");
    }
  };

  const resendToken = async () => {
    if (canResend) {
      resendCode();
      setCanResend(false);
      setSeconds(59);
    }
  };

  useEffect(() => {
    if (visible) {
      if (seconds > 0) {
        setTimeout(() => setSeconds(seconds - 1), 1000);
        setCodeInput(codeInput);
      } else {
        setCanResend(true);
      }
    } else {
      setSeconds(59);
      setCanResend(false);
    }
    // eslint-disable-next-line
  }, [visible, seconds]);

  useEffect(() => {
    setCodeInput("");
    setCodeIsIncorrect(false);
  }, [visible]);

  if (visible) {
    return (
      <Styled styles={styles}>
        <section id="TokenModal">
          <div className="backdrop" onClick={close}></div>
          <div className={`modal-content ${tecladoOn ? "teclando" : ""}`}>
            <h1 className="title-token-modal">
              Verifique seu número de telefone
            </h1>
            <h2 className="h2-token-modal">
              Enviamos um código para o número abaixo:
            </h2>
            <h1>
              <span className="number-token-modal">{phoneMask(number)}</span>
            </h1>
            <h2 className="h2-token-modal">
              Digite o código abaixo e clique em verificar para prosseguir:
            </h2>
            <input
              autoComplete="off"
              id="token-code"
              className={`${
                codeIsIncorrect ? "incorrect-token-modal" : ""
              } input-token-modal`}
              value={codeInput}
              maxLength={6}
              onChange={(e) => setCodeInput(e.target.value)}
              onFocus={() => {
                setCodeIsIncorrect(false);
                setTecladoOn(true);
              }}
              onBlur={() => {
                setTecladoOn(false);
              }}
            />
            {codeIsIncorrect ? (
              <span className="status-message-token-modal">
                Código Incorreto!{" "}
              </span>
            ) : (
              ""
            )}
            <div onClick={resendToken}>
              <span className={`resend-token ${canResend ? "" : "disable"}`}>
                O código não chegou? Reenviar código
              </span>
              <span className={`icon ${canResend ? "" : "disable-icon"}`}>
                <MdRefresh />
              </span>
              <span className="timer">
                00:{seconds < 10 ? `0${seconds}` : seconds}
              </span>
            </div>

            <div className="buttons-section">
              <button
                className="secondary secondary-button"
                onClick={actionSecondary}
                id="action-secondary-voltar"
              >
                Voltar
              </button>
              <button onClick={verifyToken} id="action-principal-verificar">
                Verificar
              </button>
            </div>
          </div>
        </section>
      </Styled>
    );
  } else {
    return null;
  }
};

export default TokenModal;
