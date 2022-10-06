import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Launch } from '../../models/launch';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrls: ['./launch-list.component.scss']
})
export class LaunchListComponent implements OnInit {
  
  @Input() launchs: Launch[] = [];
  @Output() add = new EventEmitter(false);
  @Output() edit = new EventEmitter(false);
  @Output() remove = new EventEmitter(false);

  readonly displayedColumns = ['description', 'type', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(): void {
    this.add.emit(true);
  }

  onEdit(launch: Launch): void {
    this.edit.emit(launch);
  }

  onDelete(launch: Launch) {
    this.remove.emit(launch);
  }

}


