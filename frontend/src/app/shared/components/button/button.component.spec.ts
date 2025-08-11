import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
import { TodoStatusType } from '../../../features/todo/enums/todo-status-type.enum';
import { By } from '@angular/platform-browser';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set button class to button--remove', () => {
    const type = TodoStatusType.Remove;
    component.type = type;
    component.ngOnInit();

    expect(component.buttonClass).toBe('button--remove');
  });

  it('should set button class to button--success', () => {
    const type = TodoStatusType.Success;
    component.type = type;
    component.ngOnInit();

    expect(component.buttonClass).toBe('button--success');
  });

  it('should emit onClick when button is clicked', () => {
    spyOn(component.onClick, 'emit');

    const button = fixture.debugElement.query(By.css('button'));
    button.nativeElement.click();

    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
