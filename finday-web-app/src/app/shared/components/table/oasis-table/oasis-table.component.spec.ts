/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OasisTableComponent } from './oasis-table.component';

describe('OasisTableComponent', () => {
  let component: OasisTableComponent;
  let fixture: ComponentFixture<OasisTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OasisTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OasisTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
