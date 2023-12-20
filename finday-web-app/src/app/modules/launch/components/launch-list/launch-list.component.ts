import { Component, OnInit } from '@angular/core';
import { LaunchService } from '../../services/launch.service';
import { LaunchTypeEnum, launch } from '../../interfaces/launch.interface';
import { Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-launch-list',
  templateUrl: './launch-list.component.html',
  styleUrl: './launch-list.component.scss'
})
export class LaunchListComponent implements OnInit {
  launchs$: Observable<launch[]>;
  public value = 1;
  public totalPages = 10;
  public visibleRangeLength = 5;
  public visiblePages: number[] = [];

  constructor(private launchService: LaunchService) {
    
    this.launchs$ = this.launchService
      .getLaunchByType(LaunchTypeEnum.Debit)
      .pipe(
        switchMap((resp) => of(resp.data as launch[])),
        tap((resp) => this.totalPages = resp.length),
        tap((resp) => this.updateVisiblePages())
      );
  }

  ngOnInit(): void {
    
  }

  private updateVisiblePages(): void {
    const length = Math.min(this.totalPages, this.visibleRangeLength);
    const startIndex = Math.max(
      Math.min(
        this.value - Math.ceil(length / 2),
        this.totalPages - length
      ),
      0
    );
    this.visiblePages = Array.from(
      new Array(length).keys(),
      (item) => item + startIndex + 1
    );
  }
}
