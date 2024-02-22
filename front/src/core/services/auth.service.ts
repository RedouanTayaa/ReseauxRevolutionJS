export class AuthService {
  setToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  removeToken() {
    localStorage.removeItem('jwtToken');
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}