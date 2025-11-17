import { Injectable } from '@angular/core';
import { Contato } from '../models/contato.model';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {
  private contatos: Contato[] = [
    { id: 1, nome: 'Maria Silva', email: 'maria@email.com', telefone: '75999990000' },
    { id: 2, nome: 'João Santos', email: 'joao@email.com', telefone: '75988880000' }
  ];

  getContatos(): Contato[] {
    return this.contatos;
  }

  adicionarContato(contato: Contato) {
    contato.id = this.contatos.length + 1;
    this.contatos.push(contato);
  }

  removerContato(id: number) {
    this.contatos = this.contatos.filter(c => c.id !== id);
  }
}
