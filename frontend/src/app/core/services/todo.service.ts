import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ToDo } from '../models/todo.model';

@Injectable({
  providedIn: 'root', // ToDo: explicar o motivo do providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:8000/tarefas'; // ToDo: jogar isso no environment

  constructor(private readonly httpClient: HttpClient) {}

  getTodoList(): Observable<ToDo[]> {
    return this.httpClient.get<ToDo[]>(this.apiUrl);
  }

  addTodo(todo: ToDo): Observable<ToDo> {
    return this.httpClient.post<ToDo>(this.apiUrl, todo);
  }

  removeTodo(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
