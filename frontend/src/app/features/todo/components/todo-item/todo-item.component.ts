import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDo } from '../../../../core/models/todo.model';
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
  @Input({ required: true }) toDo!: ToDo;

  @Output() deleteToDo = new EventEmitter<number>();

  readonly label = 'Remover'; // ToDo: i18n
  readonly type = ButtonTypeEnum.Delete;

  constructor() {}

  onDelete(id: number): void {
    this.deleteToDo.emit(id);
  }
}
