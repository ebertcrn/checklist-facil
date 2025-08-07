import { Component } from '@angular/core';

import { TodoPageComponent } from './features/todo/pages/todo-page/todo-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TodoPageComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
