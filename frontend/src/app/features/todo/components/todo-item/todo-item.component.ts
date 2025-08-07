import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Todo } from '../../../../core/models/todo.model';
import { ButtonTypeEnum } from '../../../../shared/components/button/button.enum';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input({ required: true }) toDo!: Todo;

  @Output() removeTodo = new EventEmitter<number>();

  readonly label = 'btnLabels.remove';
  readonly type = ButtonTypeEnum.Remove;

  onRemove(id: number): void {
    this.removeTodo.emit(id);
  }
}
