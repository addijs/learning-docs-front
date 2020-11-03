import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export class Crud {

    constructor(private url: string, private httpClient: HttpClient, entity: ) {
      this.url = url;
     }
  
    listar(): Observable<Object[]> {
       return this.httpClient.get<Object[]>(this.url);
    }
  
    inserir(usuario): Observable<Object> {
      return this.httpClient.post<Object>(this.url, usuario);
    }
  
    remover(id: number): Observable<object> {
      return this.httpClient.delete(`${this.url}/${id}`);
    }
  
    pesquisarPorId(id: number): Observable<Object> {
      return this.httpClient.get<Object>(`${this.url}/${id}`);
    }
  
    atualizar(entidade: Object): Observable<Object> {
      return this.httpClient.put<Object>(`${this.url}/${entidade.id}`, usuario);
    }
  }