import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDo } from '../../../../core/models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input({ required: true }) toDo!: ToDo;

  @Output() deleteToDo = new EventEmitter<number>();

  constructor() {}

  onDelete(id: number): void {
    this.deleteToDo.emit(id);
  }
}
