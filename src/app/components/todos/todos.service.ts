
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TodoService {

    private url: String =
        `${environment["method"]}://${environment["ip"]}:${environment["port"]}`;

    constructor(private httpClient: HttpClient) { }


    getTodos(): Observable<any> {
        return this.httpClient.get<any>(`${this.url}/todos`);
    }

    addTodo(newTodo: any): Observable<any> {
        return this.httpClient.post(`${this.url}/todos`, newTodo);
    }

    markAsDone(id: String, todo: any): Observable<any> {
        return this.httpClient.put(`${this.url}/todos/${id}`, todo);
    }

    deleteTodo(id: String) {
        return this.httpClient.delete(
            `${this.url}/todos/${id}`
        )
    }

}