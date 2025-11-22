import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../../services/contato';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contato-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './contato-edit.component.html',
  styleUrls: ['./contato-edit.component.scss']
})
export class ContatoEditComponent {
  form: FormGroup;
  id: number | null = null;
  mensagemSucesso = '';
  mensagemErro = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: ContatoService
  ) {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-zÀ-ú ]+$/)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^.+@.+\.(com|com.br|net|org|edu)$/i)]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]]
    });

    const idParam = this.route.snapshot.queryParamMap.get('id');
    this.id = idParam ? Number(idParam) : null;

    if (this.id) {
      const contato = this.service.getContato(this.id);
      if (contato) {
        this.form.patchValue({
          nome: contato.nome,
          email: contato.email,
          telefone: contato.telefone
        });
      }
    }
  }

  onPhoneInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let v = input.value.replace(/\D/g, '');
    if (v.length > 11) v = v.substring(0, 11);
    if (v.length > 0) {
      if (v.length <= 2) {
        v = '(' + v;
      } else if (v.length <= 11) {
        v = '(' + v.slice(0, 2) + ') ' + v.slice(2);
      }
    }
    if (v.replace(/\D/g, '').length >= 10) {
      const nums = v.replace(/\D/g, '');
      if (nums.length === 11) {
        v = nums.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (nums.length === 10) {
        v = nums.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      }
    }
    input.value = v;
    this.form.get('telefone')?.setValue(v, { emitEvent: false });
  }

  salvar() {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (this.form.invalid) {
      this.mensagemErro = 'Preencha corretamente os campos.';
      return;
    }

    const dados = this.form.value;

    const emailExiste = this.service.existsEmail(dados.email, this.id ?? undefined);
    if (emailExiste) {
      this.mensagemErro = 'E-mail já cadastrado.';
      return;
    }

    const telExiste = this.service.existsTelefone(dados.telefone, this.id ?? undefined);
    if (telExiste) {
      this.mensagemErro = 'Telefone já cadastrado.';
      return;
    }

    if (this.id) {
      this.service.atualizar(this.id, dados);
      this.mensagemSucesso = 'Contato atualizado com sucesso.';
    } else {
      this.service.adicionar(dados);
      this.mensagemSucesso = 'Contato adicionado com sucesso.';
      this.form.reset();
    }

    setTimeout(() => {
      this.router.navigateByUrl('/contato/list');
    }, 800);
  }

  cancelar() {
    this.router.navigateByUrl('/contato/list');
  }

  get nome() { return this.form.get('nome'); }
  get email() { return this.form.get('email'); }
  get telefone() { return this.form.get('telefone'); }
}
