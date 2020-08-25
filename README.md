This component was bootstrapped with [Direflow](https://direflow.io).

# Edit Modal
> Modal para edição de dados de contado do usuário

```html
<edit-modal></edit-modal>
```

Eventos

Evento de clique botão fechar
```javascript
editModal.addEventListener("event-close", (e) => {
  console.log("botão fechar clicado");
});
```

Evento de Sucesso ao cadastrar dados
```javascript
editModal.addEventListener("event-success", (e) => {
  console.log("Salvou dados com sucesso");
});
```

Evento de Erro ao cadastrar dados
```javascript
editModal.addEventListener("event-error", (e) => {
  console.log("Erro ao salvar dados");
});
```

# Dados
```javascript
 editModal.showPassword = true;

  editModal.userData = {
    email: {
      email: "",
      id: 0000,
      principal: "",
    },
    endereco: {
      bairro: "",
      cep: "",
      cidade: "",
      complemento: "",
      estado: "",
      id: 00000,
      logradouro: "",
      numero: "",
      pessoa_id: 0000,
      principal: "",
      tipo_logradouro_id: 00,
      tipo_logradouro_print: "",
    },
    pessoa_id: 0000
    telefone: {
      ddd: "8",
      fone: "",
      id: 00000,
      principal: "",
      validado: true,
    },
 ```

Use this README to describe your Direflow Component
