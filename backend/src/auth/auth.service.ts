import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private users = [
    {
      id: 1,
      username: 'admin',
      password: 'admin123',
      role: 'ADMIN',
    },
    {
      id: 2,
      username: 'staff',
      password: 'staff123',
      role: 'STAFF',
    },
  ];

  login(username: string, password: string) {
    const user = this.users.find(
      u => u.username === username && u.password === password,
    );

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
    };
  }
}
