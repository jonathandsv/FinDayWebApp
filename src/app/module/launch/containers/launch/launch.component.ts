import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss']
})
export class LaunchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAdd() {
    this.router.navigate(['launch/new']);
  }

}
