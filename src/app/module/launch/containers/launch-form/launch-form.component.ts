import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-launch-form',
  templateUrl: './launch-form.component.html',
  styleUrls: ['./launch-form.component.scss']
})
export class LaunchFormComponent implements OnInit {

  form = this.fb.group({
    _id: [''],
    description: [''],
    type: ['']
  });
  
  constructor(private fb: NonNullableFormBuilder,
    private location: Location) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

  onCancel() {
    this.location.back();
  }

}
