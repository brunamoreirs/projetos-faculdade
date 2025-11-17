import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Contato } from '../../models/contato.model';

@Component({
  selector: 'app-contato-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato-list.component.html',
  styleUrls: ['./contato-list.component.css']
})
export class ContatoListComponent implements OnInit {
  contatos: Contato[] = [];
  novo = { nome: '', email: '', telefone: '' };
  alertaMensagem = '';
  alertaTipo: 'success' | 'danger' = 'success';
  temaEscuro = false;

  constructor() {}

  ngOnInit() {
    const salvos = localStorage.getItem('contatos');
    this.contatos = salvos ? JSON.parse(salvos) : [];

    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
      this.temaEscuro = true;
      document.body.classList.add('dark-mode');
    }
  }

  salvarLocal() {
    localStorage.setItem('contatos', JSON.stringify(this.contatos));
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
    this.salvarLocal();
    this.mostrarAlerta('Contato removido com sucesso!', 'danger');
  }

  abrirModal() {
    const modal = document.getElementById('novoContatoModal');
    if (modal) modal.classList.add('show', 'd-block');
  }

  fecharModal() {
    const modal = document.getElementById('novoContatoModal');
    if (modal) modal.classList.remove('show', 'd-block');
  }

  validarContato(): string | null {
    const { nome, email, telefone } = this.novo;

    if (!nome.trim() || nome.length < 3)
      return 'O nome deve ter pelo menos 3 letras.';
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      return 'Digite um e-mail válido.';
    if (!/^\d{8,}$/.test(telefone))
      return 'O telefone deve conter apenas números e ter pelo menos 8 dígitos.';
    return null;
  }

  adicionarContato() {
    const erro = this.validarContato();
    if (erro) {
      this.mostrarAlerta(erro, 'danger');
      return;
    }

    const novoId = this.contatos.length
      ? Math.max(...this.contatos.map(c => c.id || 0)) + 1
      : 1;

    const novoContato: Contato = {
      id: novoId,
      nome: this.novo.nome.trim(),
      email: this.novo.email.trim(),
      telefone: this.novo.telefone.trim()
    };

    this.contatos.push(novoContato);
    this.novo = { nome: '', email: '', telefone: '' };
    this.salvarLocal();
    this.fecharModal();
    this.mostrarAlerta('Contato adicionado com sucesso!', 'success');
  }

  mostrarAlerta(mensagem: string, tipo: 'success' | 'danger') {
    this.alertaMensagem = mensagem;
    this.alertaTipo = tipo;
    const alerta = document.getElementById('alerta');
    if (alerta) {
      alerta.classList.add('show');
      setTimeout(() => alerta.classList.remove('show'), 3000);
    }
  }

  alternarTema() {
    this.temaEscuro = !this.temaEscuro;
    document.body.classList.toggle('dark-mode', this.temaEscuro);
    localStorage.setItem('tema', this.temaEscuro ? 'escuro' : 'claro');
  }
}
