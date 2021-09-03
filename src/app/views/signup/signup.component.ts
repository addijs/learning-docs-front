import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@shared/entities/user';
import { UserService } from 'app/services/user.service';
import { UserFirestoreService } from '@services/user-firestore.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User;

  inputConfirmPassword: string;

  constructor(
      private service: UserFirestoreService,
      private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit(): void {}

  signUp(): void {
    if (this.user.password !== this.inputConfirmPassword) {
      alert('Senhas inválidas');
      return;
    }

    this.service.signUp(this.user).subscribe(async () => {
      alert('Usuário cadastrado com sucesso!');
      await this.router.navigate(['/']);

      this.user = new User();
    });
  }
}
