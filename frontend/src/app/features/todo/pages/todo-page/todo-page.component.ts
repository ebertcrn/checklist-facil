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
import { TodoStatusType } from '../../enums/todo-status-type.enum';
import { IdUtils } from '../../../../shared/utils/id.utils';
import { TodoValidators } from '../../../../shared/validators/todo.validators';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { LoadingService } from '../../../../shared/services/loading.service';
import { LoadingOverlayComponent } from '../../../../shared/components/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-todo-page',
  standalone: true,
  imports: [
    TodoAddFormComponent,
    TodoListComponent,
    ReactiveFormsModule,
    TranslatePipe,
    LoadingOverlayComponent,
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
    private readonly translateService: TranslateService,
    private readonly snackbarService: SnackbarService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadTodos();
  }

  createTodo(): void {
    if (!this.todoForm.valid) {
      return;
    }

    this.loadingService.setLoading(true);

    const todoToBeAdded = {
      title: this.todoForm.value.title,
      id: IdUtils.generateUniqueId(),
      completed: false,
    };

    this.todoService
      .addTodo(todoToBeAdded)
      .pipe(
        finalize(() => {
          this.todoForm.reset();
          this.loadingService.setLoading(false);
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
          this.snackbarService.open(
            this.translateService.instant('messages.todoAdded')
          );
        },
      });
  }

  handleTodo(id: number, type: TodoStatusType): void {
    if (type === TodoStatusType.Remove) {
      this.removeTodo(id);
    } else if (type === TodoStatusType.Success) {
      this.completeTodo(id);
    }
  }

  private removeTodo(id: number): void {
    this.loadingService.setLoading(true);

    this.todoService
      .removeTodo(id)
      .pipe(
        finalize(() => {
          this.loadingService.setLoading(false);
        })
      )
      .subscribe({
        next: () => {
          this.todos = this.todos.filter((todo) => todo.id !== id);
        },
        error: () => {
          this.translateService.get('errors.removeTodo').subscribe((msg) => {
            console.error(msg);
          });
          this.todos = this.todos.filter((todo) => todo.id !== id);
          this.snackbarService.open(
            this.translateService.instant('messages.todoRemoved')
          );
        },
      });
  }

  private completeTodo(id: number): void {
    this.loadingService.setLoading(true);

    this.todoService
      .completeTodo(id)
      .pipe(
        finalize(() => {
          this.loadingService.setLoading(false);
        })
      )
      .subscribe({
        next: (res) => {
          // Online situation: show success message
        },
        error: (err) => {
          console.error(err);
          this.todos = this.todos.map((todo) =>
            todo.id === id ? { ...todo, completed: true } : todo
          );
          this.snackbarService.open(
            this.translateService.instant('messages.todoCompleted')
          );
        },
      });
  }

  private initializeForm(): void {
    this.todoForm = this.fb.group({
      title: ['', { validators: [TodoValidators.todoTitle()] }],
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
}
