import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DumpComponent } from './dump.component';

describe('DumpComponent', () => {
  let component: DumpComponent;
  let fixture: ComponentFixture<DumpComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ DumpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DumpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
