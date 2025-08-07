import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Todo } from '../../../../core/models/todo.model';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TodoStatusType } from '../../enums/todo-status-type.enum';
import { Icons } from '../../../../shared/enums/icons.enum';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input({ required: true }) todo!: Todo;

  @Output() handleTodo = new EventEmitter<{
    id: number;
    type: TodoStatusType;
  }>();

  readonly trashIcon = Icons.Trash;
  readonly checkIcon = Icons.Check;

  readonly completeLabel = 'btnLabels.complete';
  readonly removeLabel = 'btnLabels.remove';

  createType = TodoStatusType.Success;
  removeType = TodoStatusType.Remove;

  onHandleTodo(id: number, type: TodoStatusType): void {
    this.handleTodo.emit({ id, type });
  }
}
