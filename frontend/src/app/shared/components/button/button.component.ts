import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { TodoStatusType } from '../../../features/todo/enums/todo-status-type.enum';
import { Icons } from '../../enums/icons.enum';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, TranslatePipe],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) type!: TodoStatusType;
  @Input() disabled = false;
  @Input() icon?: Icons;

  @Output() onClick = new EventEmitter<void>();

  buttonClass!: string;

  constructor() {}

  ngOnInit(): void {
    this.setButtonClass();
  }

  private setButtonClass(): void {
    this.buttonClass = `button--${this.type}`;
  }

  handleClick(): void {
    this.onClick.emit();
  }
}
