import { Component, NgModule } from '@angular/core';
import { Todo } from '../../models/Todo';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor() { }

  ngOnInit(): void {
    this.todos = [
      {
        content: 'First todo',
        completed: false
      },
      {
        content: 'Second todo',
        completed: true
      }
    ]
  }

  toggleDone(id: number) {
    this.todos.map((v, i) => {
      if (i === id) v.completed = !v.completed;
      return v;
    })
  }

  removeDone(id: number) {
    this.todos = this.todos.filter((v, i) => i !== id);
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
  }

}
