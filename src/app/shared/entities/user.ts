export class User {
  id?: number | string;
  name: string;
  email: string;
  password: string;
  loggedAt: number;
  enableNotifications: boolean;

  constructor(userData?: User, id?: string) {
    if (userData) {
      this.id = id;
      this.name = userData.name;
      this.email = userData.email;
      this.password = userData.password;
      this.loggedAt = userData.loggedAt;
      this.enableNotifications = userData.enableNotifications;
    }
  }
}
