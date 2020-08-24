export interface UserData extends Pessoa {
  dependentes: Array<Dependente>;
}

export interface Pessoa {
  id: number;
  nome: string;
  nome_social: string;
  nome_mae: string;
  sexo: string;
  estado: string;
  nacionalidade: string;
  cartao_sus: string;
  data_nascimento: string;
  cpf: string;
  rg: string;
  estado_civil: string;
  estado_civil_print: string;
  grau_parentesco: string;
  titular_id: number;
  grau_parentesco_print: string;
  tipo: string;
  tipo_print: string;
  foto: string;
  digital: string;
  telefones: Array<Telefone>;
  enderecos: Array<Endereco>;
  emails: Array<Email>;
}

export interface Telefone {
  id: number;
  ddd: string;
  fone: string;
  principal: string;
  validado: boolean;
}

export interface Email {
  id: number;
  email: string;
  principal: string;
}

export interface Endereco {
  id: number;
  pessoa_id: number;
  cep: string;
  tipo_logradouro_id: number;
  tipo_logradouro_print: string;
  logradouro: string;
  complemento: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  principal: string;
}

export interface Dependente extends Pessoa {
  pss_titular: number;
}

export interface SignedData {
  adminSigned: boolean;
  userSigned: boolean;
}
