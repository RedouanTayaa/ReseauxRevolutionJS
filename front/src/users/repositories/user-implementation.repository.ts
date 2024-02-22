import { Observable, from } from 'rxjs';
import { UserEntity } from '../entities/user-entity';
import { UserMapper } from '../mappers/user.mapper';
import { UserModel } from '../models/user.model';
import { LoginModel } from '../models/login.model';
import { UserRepository } from './user.repository';
import { RegisterModel } from '../models/register.model';
import { environment } from '@/environment/environment';
import { ApiResponse } from '@/core/types';
import { RegisterCommand } from '../usecases/register.usecase';
import { LoginCommand } from '../usecases/login.usecase';
import { StripeModel } from '../models/stripe.model';
import axios from 'axios';
import { AxiosInterceptor } from '@/core/services/axios.interceptor';

export class UserImplementationRepository implements UserRepository {
  userMapper = new UserMapper();
  axiosInterceptor: AxiosInterceptor;

  constructor() {
    this.axiosInterceptor = AxiosInterceptor.getInstance(axios);
  }

  login(params: LoginCommand): Observable<LoginModel> {
    return from(this.axiosInterceptor.axios.post<ApiResponse<LoginModel>>(environment.apiUrl + '/login_check', {...params}).then(({data: response}) => {
      if (response.data === undefined || response.data.token === undefined) {
        throw new Error('Données non disponibles');
      }
      return response.data;
    }).catch((err) => {
      const { response: { data: { code, message } } } = err;
      throw new Error(message || 'Erreur inattendue');
    }));
  }

  register(params: RegisterCommand): Observable<RegisterModel> {
    return from(this.axiosInterceptor.axios.post<ApiResponse<RegisterModel>>(environment.apiUrl + '/register', {email: params.email, password: params.password}).then(({data: response}) => {
      if (response.data === undefined) {
        throw new Error('Données non disponibles');
      }
      return response.data;
    }).catch((err) => {
      const { response: { data: { code, message } } } = err;
      throw new Error(message || 'Erreur inattendue');
    }));
  }

  getUserProfile(): Observable<UserModel> {
    return from(this.axiosInterceptor.axios.get<ApiResponse<UserEntity>>(environment.apiUrl + '/user').then(({data: response}) => {
      if (response.data === undefined) {
        throw new Error('Données non disponibles');
      }
      return this.userMapper.mapFrom(response.data);
    }).catch((err) => {
      const { response: { data: { code, message } } } = err;
      throw new Error(message || 'Erreur inattendue');
    }));
  }

  forgetPassword(params: {username: string}): Observable<void> {
    return from(this.axiosInterceptor.axios.post<ApiResponse<void>>(environment.apiUrl + '/forgetpassword', {...params}).then(({data: response}) => {
      if (response.data === undefined) {
        throw new Error('Données non disponibles');
      }
      return response.data;
    }).catch((err) => {
      const { response: { data: { code, message } } } = err;
      throw new Error(message || 'Erreur inattendue');
    }));
  }

  getStripeLink(): Observable<StripeModel> {
    return from(this.axiosInterceptor.axios.get<ApiResponse<StripeModel>>(environment.apiUrl + '/stripe').then(({data: response}) => {
      if (response.data === undefined) {
        throw new Error('Données non disponibles');
      }
      return response.data;
    }).catch((err) => {
      const { response: { data: { code, message } } } = err;
      throw new Error(message || 'Erreur inattendue');
    }));
  }
}
