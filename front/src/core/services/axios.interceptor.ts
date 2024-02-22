import { AuthService } from '@/core/services/auth.service';

export class AxiosInterceptor {
  static instance: AxiosInterceptor;
  axios: any;
  auth = new AuthService();

  constructor(axios: any) {
    this.axios = axios;
  }

  static getInstance(axios: any) {
    if (!AxiosInterceptor.instance) {
      AxiosInterceptor.instance = new AxiosInterceptor(axios);
      AxiosInterceptor.instance.setupInterceptors();
    }
    return AxiosInterceptor.instance;
  }

  setupInterceptors() {
    this.axios.interceptors.request.use(
      (config: any) => {
        const token = this.auth.getToken('jwtToken');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    this.axios.interceptors.response.use(
      (response: any) => {
        return response;
      },
      (error: any) => {
        if (error.response.status === 401 && window.location.href.indexOf('/user/login') === -1) {
          this.auth.removeToken('jwtToken');
          window.location.href = '/user/login';
        }
        return Promise.reject(error);
      }
    );
  }
}