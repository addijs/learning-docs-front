export class User {
  id?: number | string;
  name: string;
  email: string;
  password: string;

  constructor(userData?: User, id?: string) {
    if (userData) {
      this.id = id;
      this.name = userData.name;
      this.email = userData.email;
      this.password = userData.password;
    }
  }
}
