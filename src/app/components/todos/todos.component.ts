import { Component, NgModule } from '@angular/core';
import { Todo } from '../../models/Todo';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {

  todos: Todo[];
  inputTodo: string = "";

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.todos = JSON.parse(this.cookieService.get("todos"));
  }

  toggleDone(id: number) {
    this.todos.map((v, i) => {
      if (i === id) v.completed = !v.completed;
      return v;
    })
  }

  removeDone(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
    this.setCookies();
  }

  addTodo() {
    if (this.inputTodo.length === 0) {
      return;
    }

    this.todos.push({
      content: this.inputTodo,
      completed: false
    });
    this.inputTodo = '';
    this.setCookies();
  }

  setCookies() {
    this.cookieService.set("todos", JSON.stringify(this.todos));
    console.log(this.todos);
  }

}
