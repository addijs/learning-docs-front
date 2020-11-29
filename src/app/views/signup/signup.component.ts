import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/entities/user';
import { UserFirestoreService } from 'app/services/user-firestore.service';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User;

  inputConfirmPassword: string;

  constructor(private service: UserFirestoreService, private router: Router) {
    this.user = new User();
  }

  ngOnInit(): void {}

  signUp(): void {
    if (this.user.password !== this.inputConfirmPassword) {
      alert('Senhas inválidas');
      return;
    }

    this.service.signup(this.user).subscribe(() => {
      alert('Usuário cadastrado com sucesso!');
      this.router.navigate(['/']);

      this.user = new User();
    });
  }
}
