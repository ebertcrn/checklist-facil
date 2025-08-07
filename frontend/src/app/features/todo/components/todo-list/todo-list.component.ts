import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToDo } from '../../../../core/models/todo.model';
import { TodoItemComponent } from '../todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent {
  @Input({ required: true }) toDos: ToDo[] = [];

  readonly title = 'Tarefas'; // ToDo: botar no i18n

  onDelete(id: number): void {
    // ToDo: implementar delete
    console.log(`Deletar: `, id);
  }
}
