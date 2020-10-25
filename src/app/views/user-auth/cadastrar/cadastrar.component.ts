import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css'],
})
export class CadastrarComponent implements OnInit {
  user: User;

  inputConfirmPassword: string;

  constructor(private service: UserService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {}

  signUp(): void {
    if (this.user.password !== this.inputConfirmPassword) {
      alert('Senhas inválidas');
    }

    this.service.signUp(this.user).subscribe(() => {
      alert('Usuário cadastrado com sucesso!');
      this.router.navigate(['/']);

      this.user = new User();
    });
  }
}
