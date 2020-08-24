This component was bootstrapped with [Direflow](https://direflow.io).

# Edit Modal
> modal para edicao de dados de contado do usuario

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

Use this README to describe your Direflow Component
