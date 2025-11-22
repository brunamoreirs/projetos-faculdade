import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { NgIf, NgClass } from '@angular/common';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form_login!: FormGroup;
  erro: string = "";
  class_validate = "";
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    this.form_login = this.fb.group({
      username: [''],
      password: ['']
    });
  }
  logar() {
    this.class_validate = "validado";
    const user = this.form_login.get('username')?.value || "";
    const pass = this.form_login.get('password')?.value || "";
    if (!user || !pass) {
      this.erro = "Preencha usuário e senha.";
      this.toast.showError(this.erro);
      return;
    }
    if (this.auth.login(user, pass)) {
      const destino = this.auth.getRedirectUrl();
      this.toast.showSuccess('Login efetuado com sucesso');
      this.router.navigateByUrl(destino);
    } else {
      this.erro = "Usuário ou senha incorretos.";
      this.toast.showError(this.erro);
    }
  }
}
