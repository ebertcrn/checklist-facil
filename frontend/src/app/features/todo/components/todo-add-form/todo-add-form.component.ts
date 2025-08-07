import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-add-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo-add-form.component.html',
  styleUrls: ['./todo-add-form.component.scss'],
})
export class TodoAddFormComponent implements OnInit {
  @Input({ required: true }) form!: FormGroup;

  @Output() add = new EventEmitter<void>();

  readonly placeholder = 'Digite uma nova tarefa';

  ngOnInit(): void {}

  get titleControl(): FormControl<string> {
    return this.form.get('title') as FormControl<string>;
  }

  addTodo(): void {
    if (!this.form.valid) {
      return;
    }

    this.add.emit();
    this.form.reset();
  }
}
