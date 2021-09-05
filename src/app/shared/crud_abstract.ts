import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

export abstract class Crud<T> {
  protected url: string;

  constructor(
      private endpoint: string,
      private httpClient: HttpClient
  ) {
    this.url = environment.url + endpoint;
  }

  listar(): Observable<T[]> {
    // return this.httpClient.get<T[]>(`${this.url}/list`);
    return this.httpClient.get<T[]>(this.url);
  }

  inserir(entidade): Observable<T> {
    // return this.httpClient.post<T>(`${this.url}/new`, entidade);
    return this.httpClient.post<T>(this.url, entidade);
  }

  remover(id: number): Observable<null> {
    return this.httpClient.delete<null>(`${this.url}/${id}`);
  }

  pesquisarPorId(id: number): Observable<T> {
    return this.httpClient.get<T>(`${this.url}/${id}`);
  }

  atualizar(id: number, data: any): Observable<T> {
    return this.httpClient.put<T>(`${this.url}/${id}`, data);
  }
}
