import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';
import { PostEntity } from '../entities/post-entity';

export abstract class PostRepository {
  abstract list(params: {}): Promise<PostModel[]>;
  abstract add(params: PostEntity): Promise<PostModel>;
  abstract edit(id: number, params: PostEntity): Observable<PostModel>;
  abstract remove(id: number): Observable<boolean>;
}
