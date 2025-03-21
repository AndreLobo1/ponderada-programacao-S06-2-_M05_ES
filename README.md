# Atividade ponderada: Caso de Teste de Software

# 1. Introdução

Este repositório é dedicado à atividade ponderada da semana 6 do curso de Engenharia de Software do Inteli (Instituto de Tecnologia e Liderança) . A atividade, intitulada "Caso de Teste de Software" , tem como objetivo aplicar os conceitos de teste de software ao nosso projeto, utilizando uma abordagem automatizada.

Para atender aos requisitos da atividade, implementamos testes automatizados para validar o funcionamento das operações CRUD (Create, Read, Update, Delete) da entidade Tecnologias Assistivas em nosso projeto. Esses testes foram projetados para verificar o comportamento das rotas e controllers responsáveis pelas operações CRUD, além de garantir a correta integração com os services que interagem com o banco de dados. A automação dos testes foi realizada utilizando o framework Jest em conjunto com a biblioteca Supertest , que nos permitiu simular requisições HTTP e validar as respostas da API de forma eficiente.

Você pode acessar o arquivo de teste clicando [aqui](https://github.com/AndreLobo1/ponderada-programacao-S06-2-_M05_ES/blob/main/tecnologiasAssistivas.test.js).

# 2. Objetivo

O objetivo deste caso de teste é validar o funcionamento das rotas e controllers responsáveis pelas operações CRUD da entidade Tecnologias Assistivas pfuncionam conforme o esperado na aplicação. Especificamente, queremos garantir que:

- A criação de novas tecnologias assistivas seja bem-sucedida.
- A listagem de tecnologias assistivas retorne os dados corretos.
- A atualização de tecnologias assistivas altere os campos conforme especificado.
- A exclusão de tecnologias assistivas remova os registros do banco de dados.

Esses testes validam tanto o backend quanto a integração com o banco de dados.

# 3. Pré-Condições

Para a execução dos testes, as seguintes pré-condições devem ser atendidas:

1. O banco de dados deve estar criado e populado com as tabelas necessárias.

2. O backend deve estar conectado ao banco de dados e rodando na porta correta `http://localhost:3000`.

3. A rota `http://localhost:3000/api/tecnologias-assistivas/` deve estar acessível e funcional.

# 4. Procedimento de Teste

Abaixo estão descritos os procedimentos de teste para cada operação do CRUD, juntamente com trechos específicos do código implementado.

### 4.1. Operação de Criação (Create)

Testamos a criação de uma nova tecnologia assistiva com os atributos `nome`, `descricao` e `tipo`. Abaixo está o trecho do código onde implementamos esse teste:

```typescript
it('Deve criar uma nova tecnologia assistiva', async () => {
    const res = await request(baseURL)
        .post('/')
        .send({
            nome: 'Teste Tecnologia',
            descricao: 'Descrição de teste',
            tipo: 'Tipo de teste'
        });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
});
```

### 4.2. Operação de Leitura (Read)

Testamos a listagem de todas as tecnologias assistivas para verificar se o registro criado anteriormente está presente. Trecho do código:

```typescript
it('Deve listar todas as tecnologias assistivas', async () => {
    const res = await request(baseURL).get('/');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
});
```

### 4.3. Operação de Atualização (Update)

Testamos a atualização de uma tecnologia assistiva existente, alterando os campos `nome`, `descricao` e `tipo`. Trecho do código:

```typescript
it('Deve atualizar uma tecnologia assistiva existente', async () => {
    const res = await request(baseURL)
        .put(`/${tecnologiaId}`)
        .send({
            nome: 'Tecnologia Atualizada',
            descricao: 'Descrição atualizada',
            tipo: 'Tipo atualizado'
        });
    expect(res.statusCode).toEqual(200);
    expect(res.body.nome).toEqual('Tecnologia Atualizada');
});
```

### 4.4. Operação de Exclusão (Delete)

Testamos a exclusão de uma tecnologia assistiva e verificamos se ela não pode mais ser acessada após a exclusão. Trecho do código:

```typescript
it('Deve excluir uma tecnologia assistiva existente', async () => {
    const res = await request(baseURL).delete(`/${tecnologiaId}`);
    expect(res.statusCode).toEqual(200);
});

it('Deve retornar erro ao tentar acessar uma tecnologia excluída', async () => {
    const res = await request(baseURL).get(`/${tecnologiaId}`);
    expect(res.statusCode).toEqual(404);
});
```

# 5. Resultado Esperado

Segue uma tabela exibindo os resultados esperados para cada operação:

| **Operação**   | **Descrição**                                                                 | **Resultado Esperado**                                                                 |
|-----------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **Create**      | Criar uma nova tecnologia assistiva com os atributos `nome`, `descricao` e `tipo`. | Status HTTP 201 e ID gerado para a tecnologia assistiva.                              |
| **Read**        | Listar todas as tecnologias assistivas cadastradas.                          | Status HTTP 200 e um array contendo as tecnologias assistivas cadastradas.            |
| **Update**      | Atualizar uma tecnologia assistiva existente.                                | Status HTTP 200 e os novos valores refletidos na resposta.                            |
| **Delete**      | Excluir uma tecnologia assistiva existente.                                  | Status HTTP 200 e a tecnologia assistiva não deve mais ser acessível via GET.         |

# 6. Resultado Obtido

Segue um print do resultado obtido:

<p align="center">
  <img src="" alt="Resultado dos Testes" />
</p>

Com base no print acima, podemos concluir que:

- Todos os testes foram executados com sucesso.
- As operações CRUD retornaram os resultados esperados, conforme descrito na tabela anterior.
- Não houve falhas ou inconsistências durante a execução dos testes.

# 7. Pós-Condição

Com base nos procedimentos descritos e nos resultados esperados, concluímos que as pós-condições são as seguintes:

1. O banco de dados foi modificado durante a execução dos testes (criação, atualização e exclusão de registros).

2. Após a conclusão dos testes, os registros criados durante os testes foram excluídos, deixando o banco de dados em um estado consistente.

3. O backend permaneceu funcional e pronto para receber novas requisições.

Após a execução dos testes, pudemos confirmar que essas pós-condições se concretizaram através da verificação do estado final do banco de dados e da funcionalidade contínua do backend. As operações CRUD realizadas durante os testes não deixaram resíduos indesejados no banco de dados, garantindo que ele retornasse ao estado inicial após a exclusão dos registros criados. Além disso, todas as requisições ao backend continuaram respondendo corretamente, evidenciando que o sistema permaneceu estável e operacional após a execução dos testes.

# 8. Resumo dos Casos de Teste

Segue uma tabela resumindo todos os casos de teste realizados, com seus respectivos objetivos, pré-condições, procedimentos, resultados esperados, resultados obtidos e pós-condições.

| **Título do Caso**                     | **Objetivo**                                                                                   | **Pré-Condição**                                                                 | **Procedimento de Teste**                                                                                   | **Resultado Esperado**                                                                                     | **Resultado Obtido**                                                                                     | **Pós-Condição**                                                                                       |
|----------------------------------------|-----------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------|
| **Criação de Tecnologia Assistiva**    | Validar a criação de uma nova tecnologia assistiva                                             | Backend rodando, banco de dados conectado                                        | Tentar criar uma tecnologia assistiva com atributos (`nome`, `descricao`, `tipo`)                           | Status HTTP 201 e retorno do ID da tecnologia criada                                                       | Status HTTP 201 e ID retornado                                                                          | Registro adicionado ao banco de dados                                                                  |
| **Listagem de Todas as Tecnologias**   | Validar a listagem de todas as tecnologias assistivas                                          | Backend rodando, banco de dados conectado, pelo menos uma tecnologia cadastrada  | Realizar uma requisição GET para listar todas as tecnologias                                                | Status HTTP 200 e array contendo todas as tecnologias cadastradas                                          | Status HTTP 200 e array retornado                                                                       | Banco de dados inalterado                                                                              |
| **Atualização de Tecnologia**          | Validar a atualização de uma tecnologia assistiva                                              | Backend rodando, banco de dados conectado, pelo menos uma tecnologia cadastrada  | Realizar uma requisição PUT passando o ID e novos atributos (`nome`, `descricao`, `tipo`)                    | Status HTTP 200 e retorno da tecnologia com os dados atualizados                                           | Status HTTP 200 e tecnologia atualizada retornada                                                        | Registro atualizado no banco de dados                                                                  |
| **Exclusão de Tecnologia**             | Validar a exclusão de uma tecnologia assistiva                                                 | Backend rodando, banco de dados conectado, pelo menos uma tecnologia cadastrada  | Realizar uma requisição DELETE passando o ID de uma tecnologia existente                                     | Status HTTP 200 e confirmação de exclusão                                                                 | Status HTTP 200 e confirmação retornada                                                                 | Registro removido do banco de dados                                                                    |

# 9. Conclusão

Em conclusão, este projeto foi um exercício de valor para desenvolver habilidades de aplicação prática dos conceitos de teste de software.realizar a atividade , pudemos consolidar nosso entendimento sobre a importância de validar o comportamento do sistema em diferentes cenários. Esperamos que este material atenda aos critérios de qualidade da atividade.


