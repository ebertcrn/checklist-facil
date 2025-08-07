import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TodoService } from '../../../../core/services/todo.service';
import { ToDo } from '../../../../core/models/todo.model';
import { TodoAddFormComponent } from '../../components/todo-add-form/todo-add-form.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [TodoAddFormComponent, TodoListComponent, ReactiveFormsModule],
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  title = 'Todo List';
  toDos: ToDo[] = [];
  todoForm!: FormGroup;

  constructor(
    private readonly todoService: TodoService,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
    });

    this.todoService.getTodoList().subscribe({
      next: (toDos: ToDo[]) => {
        console.log(toDos);
        this.toDos = toDos;
      },
      error: (err) => {
        console.log(err);
        // ToDo: colocar tarefas offline em outro lugar
        this.toDos = [
          { id: 1, title: 'Tarefa offline 1', completed: false },
          { id: 2, title: 'Tarefa offline 2', completed: true },
        ];
      },
    });
  }

  addTodo(): void {
    const body = {
      title: this.todoForm.value.title,
      id: Math.floor(Math.random() * 1000),
      completed: false,
    };
    console.log(body);
  }
}
