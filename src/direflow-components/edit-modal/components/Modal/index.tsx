import React from "react";

import styles from "./styles.css";
import { Styled } from "direflow-component";

export interface ModalProps {
  visible: boolean;
  actionPrincipal(): void;
  actionSecondary?(): void;
  close?(): void;
  message?: string;
  subMessage?: string;
  nameMessage?: string;
  dateMessage?: string;
  isError?: boolean;
  isSuccess?: boolean;
  buttonPrincipalText: string;
  buttonSecondaryText?: string;
  isButtonGreen?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  visible, // ocultar modal
  actionPrincipal, // acão do botão princial
  actionSecondary, // ação do botão secundário
  close,
  message, // texto principal
  subMessage, // texto em verde
  nameMessage, // nome do usuário
  dateMessage, // data
  buttonPrincipalText,
  buttonSecondaryText,
  isError = false, // exibir icone de erro
  isButtonGreen = false, // botão princiapl verde
}) => {
  if (visible) {
    return (
      <Styled styles={styles}>
        <section id="Modal">
          <div className="backdrop" onClick={close}></div>
          <div className="modal-content">
            <img
              src={
                isError
                  ? "https://livsaude.com.br/assets/totem/warning.svg"
                  : "https://livsaude.com.br/assets/totem/correct.svg"
              }
              alt="sucesso"
            />
            <h1>{message}</h1>
            <h2>{subMessage}</h2>
            <h3>{nameMessage}</h3>
            <h3>{dateMessage}</h3>
            <div className="buttons-section">
              {buttonSecondaryText && (
                <button
                  className="secondary"
                  id="action-secondary"
                  onClick={actionSecondary}
                >
                  {buttonSecondaryText}
                </button>
              )}
              <button
                id="action-principal"
                className={isButtonGreen ? "success-button" : ""}
                onClick={actionPrincipal}
              >
                {buttonPrincipalText}
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

export default Modal;
