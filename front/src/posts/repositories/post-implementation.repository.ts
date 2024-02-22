import { PostRepository } from '../repositories/post.repository';
import { from, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { PostModel } from '../models/post.model';
import { PostMapper } from '../mappers/post.mapper';
import { ApiResponse } from '@/core/types';
import { environment } from '@/environment/environment';
import { PostEntity } from '../entities/post-entity';
import { PostService } from '../services/post.service';
import axios from 'axios';

export class PostImplementationRepository implements PostRepository {
  postMapper = new PostMapper();

  constructor(private postService: PostService) {}
  add(params: PostEntity): Observable<PostModel> {
    return from(this.axiosInterceptor.axios.post<ApiResponse<PostEntity>>(environment.apiUrl + '/publications', {...params}).then(({data: response}) => {
      if (response.data === undefined) {
        throw new Error('Données non disponibles');
      }

      let postAddModel = this.postMapper.mapFrom(response.data);
      this.postService.addPostLocally(postAddModel);
      return postAddModel;
    }).catch((err) => {
      throw new Error(err.error?.message);
    }));
  }

  edit(id: number, params: {}): Observable<PostModel> {
    return from(this.axiosInterceptor.axios.post<ApiResponse<PostEntity>>(environment.apiUrl + '/publications/'+id, {...params}).then(({data: response}) => {
      if (response.data === undefined) {
        throw new Error('Données non disponibles');
      }

      let postEditModel = this.postMapper.mapFrom(response.data)
      this.postService.editPostLocally(id, postEditModel);
      return postEditModel;
    }).catch((err) => {
      throw new Error(err.error?.message);
    }));
  }

  list(params: {}): Observable<PostModel[]> {
    return from(this.axiosInterceptor.axios.get<ApiResponse<PostEntity[]>>(environment.apiUrl + '/publications').then(({data: response}) => {
      if (response.data === undefined) {
        throw new Error('Données non disponibles');
      }

      let postsLit = response.data.map((post) => this.postMapper.mapFrom(post));
      this.postService.setPostLocally(postsLit);
      return postsLit;
    }).catch((err) => {
      throw new Error(err.error?.message);
    }));
  }

  remove(id: number): Observable<boolean> {
    return from(this.axiosInterceptor.axios.delete<ApiResponse>(environment.apiUrl + '/publications/'+id).then(({data: response}) => {
      this.postService.removePostLocally(id);
      return response.success;
    }).catch((err) => {
      throw new Error(err.error?.message);
    }));
  }

}
