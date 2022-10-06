import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Launch } from '../../models/launch';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss']
})
export class LaunchComponent implements OnInit {

  launchs$: Observable<Launch[]> | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.router.navigate(['launch/new']);
  }

  onEdit(launch: Launch): void {

  }

  onRemove(launch: Launch): void {

  }

}
