import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ButtonTypeEnum } from '../../../../shared/components/button/button.enum';

@Component({
  selector: 'app-todo-add-form',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, TranslatePipe],
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
})
export class TodoAddFormComponent {
  @Input({ required: true }) form!: FormGroup;

  @Output() add = new EventEmitter<void>();

  readonly label = 'btnLabels.add';
  readonly type = ButtonTypeEnum.Create;
  readonly placeholder = 'addTodoPlaceholder';

  get titleControl(): FormControl<string> {
    return this.form.get('title') as FormControl<string>;
  }

  addTodo(): void {
    this.add.emit();
  }
}
