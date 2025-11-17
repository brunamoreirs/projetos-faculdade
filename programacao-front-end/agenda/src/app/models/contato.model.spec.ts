import { Contato } from './contato.model';

describe('Contato Interface', () => {

  it('deve criar um objeto válido', () => {
    const contato: Contato = {
      id: 1,
      nome: 'Bruna',
      email: 'bruna@email.com',
      telefone: '75 9999-9999'
    };

    expect(contato).toBeTruthy();
  });

  it('deve atribuir corretamente os valores', () => {
    const contato: Contato = {
      id: 2,
      nome: 'João',
      email: 'joao@email.com',
      telefone: '75 90000-0000'
    };

    expect(contato.id).toBe(2);
    expect(contato.nome).toBe('João');
    expect(contato.email).toBe('joao@email.com');
    expect(contato.telefone).toBe('75 90000-0000');
  });

});
