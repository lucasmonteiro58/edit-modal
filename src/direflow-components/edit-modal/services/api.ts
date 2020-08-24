/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-useless-catch */
import axios from "axios";
import config from "./config";

export const api = axios.create({
  baseURL: config.URL_API,
});

export const loginUser = async (cpf: string, data: string) => {
  try {
    const response = await api.get(
      "pessoa?cpf=" + cpf + "&data_nascimento=" + data
    );
    return response;
  } catch (e) {
    throw e;
  }
};

export const getTipoLogradouro = async () => {
  try {
    const response = await api.get("pessoa/tipo-logradouro");
    return response.data.data;
  } catch (e) {
    throw e;
  }
};

export const getAddressByCep = async (cep: string) => {
  try {
    const response = await api.get(`pessoa/cep/${cep}`);
    return response.data.data;
  } catch (e) {
    throw e;
  }
};

export const postEndereco = async (pessoa_id: number, endereco: object) => {
  try {
    const response = await api.post("pessoa/enderecos", {
      pessoa_id: pessoa_id,
      ...endereco,
    });
    console.log("Endereço Cadastrado");
    return response;
  } catch (e) {
    throw e;
  }
};

export const putEndereco = async (endereco_id: number, endereco: object) => {
  try {
    const response = await api.put(`pessoa/${endereco_id}/enderecos`, endereco);
    console.log("Endereço Atualizado");
    return response;
  } catch (e) {
    throw e;
  }
};

export const putEmail = async (email_id: number, email: object) => {
  try {
    const response = await api.put(`pessoa/${email_id}/emails`, email);
    console.log("Email Atualizado");
    return response;
  } catch (e) {
    throw e;
  }
};

export const postEmail = async (pessoa_id: number, email: object) => {
  try {
    const response = await api.post("pessoa/emails", {
      pessoa_id: pessoa_id,
      ...email,
    });
    console.log("Email Cadastrado");
    return response;
  } catch (e) {
    throw e;
  }
};

export const disableEmail = async (email_id: number) => {
  try {
    const response = await api.put(`pessoa/${email_id}/desativa-emails`);
    console.log("Email Desativado");
    return response;
  } catch (e) {
    throw e;
  }
};

export const checkTelephoneIsValid = async (
  pessoa_id: number,
  celular: string
) => {
  try {
    const response = await api.post("pessoa/verificar-validacao-celular", {
      pessoa_id: pessoa_id,
      celular: celular,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const sendTelephoneToken = async (
  pessoa_id: number,
  celular: string
) => {
  try {
    const response = await api.post("pessoa/enviar-validacao-celular", {
      pessoa_id: pessoa_id,
      celular: celular,
    });
    return response.data.token;
  } catch (e) {
    throw e;
  }
};

export const validateTelephone = async (
  token: string,
  pessoa_id: number,
  celular: string
) => {
  try {
    const response = await api.post("pessoa/validar-celular", {
      token: token,
      pessoa_id: pessoa_id,
      celular: celular,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const putTelefone = async (
  telefone_id: number,
  ddd: string,
  celular: string
) => {
  try {
    const response = await api.put(`pessoa/${telefone_id}/telefones`, {
      ddd: ddd,
      celular: celular,
    });
    console.log("Telefone Atualizado");
    return response;
  } catch (e) {
    throw e;
  }
};

export const postTelefone = async (
  pessoa_id: number,
  ddd: string,
  celular: string
) => {
  console.log(celular);
  try {
    const response = await api.post("pessoa/telefones", {
      pessoa_id: pessoa_id,
      ddd: ddd,
      celular: celular,
    });
    return response.data;
  } catch (e) {
    throw e;
  }
};

export const putBiometria = async (pessoa_id: number, hash: string) => {
  try {
    const response = await api.put(`pessoa/${pessoa_id}/salva-digital`, {
      digital: hash,
    });
    console.log("Biometria Atualizada");
    return response;
  } catch (e) {
    throw e;
  }
};

export const enviarBoasVindas = async (pessoaId: number, celular: string) => {
  try {
    // const response = await axios.post(
    //   `https://api.tst.pep.livsaude.com.br/v2/pessoa/${pessoaId}/bem-vindo`,
    //   {
    //     origem: "totem",
    //     celular: celular,
    //   }
    // );
    // const response2 = await axios.post(
    //   `https://api-new.livsaude.com.br/v2/pessoa/${pessoaId}/bem-vindo`,
    //   {
    //     origem: "totem",
    //     celular: celular,
    //   }
    // );
    const response = await api.post(`pessoa/${pessoaId}/bem-vindo`, {
      origem: "totem",
      celular: celular,
    });
    return response;
  } catch (e) {
    throw e;
  }
};
