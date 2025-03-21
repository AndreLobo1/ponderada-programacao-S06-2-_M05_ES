const request = require('supertest');
const baseURL = 'http://localhost:3000/api/tecnologias-assistivas';

describe('CRUD de Tecnologias Assistivas', () => {
    let tecnologiaId;

    // Teste: Criar uma nova tecnologia assistiva
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
        tecnologiaId = res.body.id; // Armazena o ID para uso posterior
    });

    // Teste: Listar todas as tecnologias assistivas
    it('Deve listar todas as tecnologias assistivas', async () => {
        const res = await request(baseURL).get('/');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    // Teste: Atualizar uma tecnologia assistiva
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

    // Teste: Excluir uma tecnologia assistiva
    it('Deve excluir uma tecnologia assistiva existente', async () => {
        const res = await request(baseURL).delete(`/${tecnologiaId}`);
        expect(res.statusCode).toEqual(200);
    });

    // Teste: Verificar se a tecnologia foi excluída
    it('Deve retornar erro ao tentar acessar uma tecnologia excluída', async () => {
        const res = await request(baseURL).get(`/${tecnologiaId}`);
        expect(res.statusCode).toEqual(404);
    });
});
