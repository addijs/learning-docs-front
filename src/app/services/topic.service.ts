import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Crud } from 'app/shared/crud_abstract';

@Injectable({
  providedIn: 'root'
})
export class TopicService extends Crud{

  constructor(private http: HttpClient) { 
    super('http://localhost:3333/topic', http)
  }

}
