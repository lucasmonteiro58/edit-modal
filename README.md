This component was bootstrapped with [Direflow](https://direflow.io).

# Edit Modal
> Modal para edição de dados de contado do usuário

```html
<edit-modal></edit-modal>
```

### Eventos

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

### Dados
```javascript
 editModal.showPassword = true;

 editModal.userData = {
  email: {
    email: string;
    id: number;
    principal: string;
  };
  endereco: {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    estado: string;
    id: number;
    logradouro: string;
    numero: string;
    pessoa_id: number;
    principal: string;
    tipo_logradouro_id: number;
    tipo_logradouro_print: number;
  };
  pessoa_id: number;
  telefone: {
    ddd: string;
    fone: string;
    id: number;
    principal: string;
    validado: true;
  };
 },
 ```
 ### Comandos
 ```code
 yarn install
 yarn start
 yarn build
 ```

Use this README to describe your Direflow Component
