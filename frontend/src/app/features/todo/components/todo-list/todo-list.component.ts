import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

import { Todo } from '../../../../core/models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, TranslatePipe],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input({ required: true }) toDos: Todo[] = [];

  @Output() removeTodo = new EventEmitter<number>();

  readonly emptyList = 'emptyList';

  onRemove(id: number): void {
    this.removeTodo.emit(id);
  }
}
