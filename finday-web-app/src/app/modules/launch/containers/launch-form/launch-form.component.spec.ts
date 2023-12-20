import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchFormComponent } from './launch-form.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LaunchFormComponent', () => {
  let component: LaunchFormComponent;
  let fixture: ComponentFixture<LaunchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LaunchFormComponent, RouterTestingModule],
      // providers: [
      //   {
      //     provide: Resolve
      //   }
      // ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaunchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
