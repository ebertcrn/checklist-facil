import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs/internal/operators/finalize';

import { TodoService } from '../../../../core/services/todo.service';
import { Todo } from '../../../../core/models/todo.model';
import { TodoAddFormComponent } from '../../components/todo-add-form/todo-add-form.component';
import { TodoListComponent } from '../../components/todo-list/todo-list.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    TodoAddFormComponent,
    TodoListComponent,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './todo-page.component.html',
  styleUrls: ['./todo-page.component.scss'],
})
export class TodoPageComponent implements OnInit {
  todos: Todo[] = [];
  todoForm!: FormGroup;

  readonly title = 'title';
  readonly listTitle = 'listTitle';

  private readonly offlineTodos: Todo[] = [
    { id: 1, title: 'Tarefa offline 1', completed: false },
    { id: 2, title: 'Tarefa offline 2', completed: true },
  ];
  constructor(
    private readonly todoService: TodoService,
    private readonly fb: FormBuilder,
    private readonly translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTodos();
  }

  addTodo(): void {
    if (!this.todoForm.valid) {
      return;
    }

    const todoToBeAdded = {
      title: this.todoForm.value.title,
      id: this.generateUniqueId(),
      completed: false,
    };

    this.todoService
      .addTodo(todoToBeAdded)
      .pipe(
        finalize(() => {
          this.todoForm.reset();
        })
      )
      .subscribe({
        next: (res: Todo) => {
          this.todos.push(res);
        },
        error: () => {
          this.translateService.get('errors.addingTodo').subscribe((msg) => {
            console.error(msg);
          });
          this.todos.push(todoToBeAdded);
        },
      });
  }

  removeTodo(id: number): void {
    this.todoService.removeTodo(id).subscribe({
      next: () => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      error: () => {
        this.translateService.get('errors.removeTodo').subscribe((msg) => {
          console.error(msg);
        });
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
    });
  }

  private initializeForm(): void {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
    });
  }

  private loadTodos(): void {
    this.todoService.getTodoList().subscribe({
      next: (todos: Todo[]) => {
        this.todos = todos;
      },
      error: () => {
        this.translateService.get('errors.loadingTodos').subscribe((msg) => {
          console.error(msg);
        });
        this.todos = this.offlineTodos;
      },
    });
  }

  private generateUniqueId(): number {
    return Date.now();
  }
}
