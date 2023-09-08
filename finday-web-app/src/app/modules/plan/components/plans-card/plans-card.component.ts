import { Component, OnInit } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { planBase } from '../../interfaces/plan.interface';

@Component({
  selector: 'app-plans-card',
  templateUrl: './plans-card.component.html',
  styleUrls: ['./plans-card.component.scss']
})
export class PlansCardComponent implements OnInit {
  plans: planBase[] = [];

  constructor(private planService: PlanService) {}

  ngOnInit(): void {
    this.planService.getPlans().subscribe({
      next: (resp) => {
        this.plans = resp.data as planBase[]; 
      }
    })
  }

}
