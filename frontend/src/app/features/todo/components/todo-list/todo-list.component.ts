import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { Todo } from '../../../../core/models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoStatusType } from '../../enums/todo-status-type.enum';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TranslatePipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input({ required: true }) todos: Todo[] = [];

  @Output() handleTodo = new EventEmitter<{
    id: number;
    type: TodoStatusType;
  }>();

  readonly emptyList = 'emptyList';

  onHandleTodo(id: number, type: TodoStatusType): void {
    this.handleTodo.emit({ id, type });
  }
}
