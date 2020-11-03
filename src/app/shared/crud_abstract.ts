import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export abstract class Crud<T> {
  constructor(private url: string, private httpClient: HttpClient) {
    this.url = url;
  }

  listar(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  inserir(entidade): Observable<T> {
    return this.httpClient.post<T>(this.url, entidade);
  }

  remover(id: number = 1): Observable<T> {
    return this.httpClient.delete<T>(`${this.url}/${id}`);
  }

  pesquisarPorId(id: number = 1): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  atualizar(id: number = 1, data: any): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${id}`, data);
  }
}
