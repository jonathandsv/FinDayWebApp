import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
//import { Launch } from '../../models/launch';
import { LaunchService } from '../../launch.service';
import { Launch } from '../../interfaces/launch.interface';
import { map, tap } from 'rxjs/operators';
import { IBalance } from '../../interfaces/balance.interface';

@Component({
  selector: 'app-launch',
  templateUrl: './launch.component.html',
  styleUrls: ['./launch.component.scss']
})
export class LaunchComponent implements OnInit {
  balance: IBalance = { value: 0};
  launchs$: Observable<Launch[]> | null = null;

  constructor(private router: Router,
              private launchService: LaunchService) { 
                
              }

  ngOnInit(): void {
    this.launchService.getBalance().subscribe({
      next: (resp) => {
        this.balance = resp;
      }
    })
    this.launchs$ = this.launchService.getByFilter({})
      .pipe(
        tap(x => console.log('teste', x)),
        // map(x => x.data?.list as Launch[]),
        tap(x => console.log('teste', x)),
        catchError(error => {
          //message error
          return of([])
        })
      );
  }

  onAdd(): void {
    this.router.navigate(['launch/new']);
  }

  onEdit(launch: Launch): void {

  }

  onRemove(launch: Launch): void {

  }

}
