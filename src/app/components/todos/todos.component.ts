import { Component, NgModule } from '@angular/core';
import { Todo } from '../../models/Todo';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todos.service';
import { v4 as UUID } from 'uuid';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [NgFor, FormsModule],
  providers: [TodoService],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent {

  todos: Todo[];
  inputTodo: string = "";

  constructor(private todoService: TodoService) {
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getTodos()
      .subscribe(
        {
          next: (data) => this.todos = data,
          error: (errorResposne) => console.error("Error during fetching todos", errorResposne)
        }
      );
  }

  toggleDone(id: string) {

    this.todos
      .map((v, i) => {
        if (v.id === id) {
          v.completed = !v.completed;
          this.todoService.markAsDone(v.id, v)
            .subscribe(
              {
                next: (response) => v.completed = response?.completed,
                error: (errorResponse) => console.error("Error during updating", errorResponse)
              }
            )
        }
        return v;
      })
  }

  removeDone(id: string) {
    this.todoService.deleteTodo(id)
      .subscribe(
        {
          next: () => this.todos = this.todos.filter((v, i) => v.id !== id),
          error: (errorResponse) => console.error("Error during deletion", errorResponse)
        }
      );
  }

  addTodo() {
    if (this.inputTodo.length === 0) {
      return;
    }
    const newTodo = {
      id: UUID(),
      content: this.inputTodo,
      completed: false
    };
    this.todoService.addTodo(newTodo)
      .subscribe(
        {
          next: (response) => {
            this.todos.push(response)
          },
          error: (errorResponse) => {
            console.error("Error during fetching todos", errorResponse)
          }
        }
      );
    this.inputTodo = '';
  }

}
