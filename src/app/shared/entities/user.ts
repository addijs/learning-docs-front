export class User {
  id?: number | string;
  name?: string;
  email?: string;
  password?: string;

  constructor(id?: string, userData: User = {}) {
    this.id = id;
    this.name = userData.name;
    this.email = userData.email;
    this.password = userData.password;
  }
}
