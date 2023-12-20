import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchComponent } from './launch.component';

import { RouterTestingModule } from '@angular/router/testing';

describe('LaunchComponent', () => {
  let component: LaunchComponent;
  let fixture: ComponentFixture<LaunchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaunchComponent, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LaunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('teste', () => {
    expect(true).toBeTruthy();
  });
});
