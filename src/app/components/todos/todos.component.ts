import { Component, NgModule } from '@angular/core';
import { Todo } from '../../models/Todo';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from './todos.service';
import {v4 as UUID} from 'uuid';

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
    this.todoService.getTodos().subscribe((data) => {
      this.todos = data;
    }, (error) => {
      console.error("Error during fetching todos", error);
    }
    );
  }

  toggleDone(id: string) {

    this.todos
      .map((v, i) => {
        if (v.id === id) {
          v.completed = !v.completed;
          this.todoService.markAsDone(v.id, v)
            .subscribe((data) => v.completed = data?.completed,
              (error) => console.error("Error during updating", error))
        }
        return v;
      })
  }

  removeDone(id: string) {
    // this.todos = this.todos.filter((v, i) => v.id !== id);
    this.todoService.deleteTodo(id).subscribe(
      () => this.getAllTodos(),
      (error) => console.error("Error during deletion", error));
  }

  addTodo() {
    if (this.inputTodo.length === 0) {
      return;
    }
    const generatedUUID: string = UUID();

    const newTodo = {
      id: generatedUUID,
      content: this.inputTodo,
      completed: false
    };
    this.todoService.addTodo(newTodo).subscribe((data) => {
      this.todos.push(data);
    }, (error) => {
      console.error("Error during fetching todos", error);
    }
    );
    this.inputTodo = '';
  }

}
