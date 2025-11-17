import { TestBed } from '@angular/core/testing';
import { ContatoService } from './contato';
import { Contato } from '../models/contato.model';

describe('ContatoService', () => {
  let service: ContatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return initial contatos', () => {
    const contatos = service.getContatos();
    expect(contatos.length).toBe(2);
  });

  it('should add a contato', () => {
    const novoContato: Contato = { nome: 'Ana', email: 'ana@email.com', telefone: '75977770000' };
    service.adicionarContato(novoContato);
    const contatos = service.getContatos();
    expect(contatos.length).toBe(3);
    expect(contatos[2].nome).toBe('Ana');
  });

  it('should remove a contato', () => {
    service.removerContato(1);
    const contatos = service.getContatos();
    expect(contatos.length).toBe(1);
    expect(contatos[0].id).toBe(2);
  });
});
