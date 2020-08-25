const configDev = {
  URL_API: "https://api.tst.pep.livsaude.com.br/v2/",
  //URL_API: "https://api-new.livsaude.com.br/v2/",
  URL_BIOMETRIA: "http://localhost:9000/api/public/v1/captura/",
  URL_IMPRESSAO: "https://api.totem.livsaude.com.br/",
};

// const configProd = {
//   URL_API: "https://api-new.livsaude.com.br/v2/",
//   URL_BIOMETRIA: "http://localhost:9000/api/public/v1/captura/",
//   URL_IMPRESSAO: "https://api.totem.livsaude.com.br/",
// };

export default process.env.NODE_ENV === "production" ? configDev : configDev;
