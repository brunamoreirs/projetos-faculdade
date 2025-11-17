import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContatoService } from '../../services/contato';
import { Contato } from '../../models/contato.model';

@Component({
  selector: 'app-contato-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato-edit.html',
  styleUrls: ['./contato-edit.css']
})
export class ContatoEditComponent {
  contato: Contato = {
    id: 0,
    nome: '',
    email: '',
    telefone: ''
  };

  constructor(private contatoService: ContatoService) {}

  salvarContato() {
    this.contatoService.adicionarContato(this.contato);

    alert('Contato adicionado com sucesso!');

    this.contato = {
      id: 0,
      nome: '',
      email: '',
      telefone: ''
    };
  }
}
