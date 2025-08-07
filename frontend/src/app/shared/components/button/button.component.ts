import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { ButtonTypeEnum } from './button.enum';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) type!: ButtonTypeEnum;

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
