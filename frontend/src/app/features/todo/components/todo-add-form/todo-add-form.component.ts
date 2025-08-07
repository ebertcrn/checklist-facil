import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TodoStatusType } from '../../enums/todo-status-type.enum';
import { Icons } from '../../../../shared/enums/icons.enum';

@Component({
  selector: 'app-todo-add-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, TranslatePipe],
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
})
export class TodoAddFormComponent {
  @Input({ required: true }) form!: FormGroup;

  @Output() create = new EventEmitter<void>();

  readonly addIcon = Icons.Add;
  readonly label = 'btnLabels.add';
  readonly type = TodoStatusType.Success;
  readonly placeholder = 'addTodoPlaceholder';

  get titleControl(): FormControl<string> {
    return this.form.get('title') as FormControl<string>;
  }

  createTodo(): void {
    this.create.emit();
  }
}
