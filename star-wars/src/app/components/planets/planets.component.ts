import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {

  public planetsData:any = [];
  public arrayPlanetsKeys = [];

  constructor(private http: HttpService) {
  }

  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.http
      .getData('planets/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        this.planetsData = [...resp.results];
        this.arrayPlanetsKeys = this.getPlanetsKeys(this.planetsData);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPlanetsKeys(arr: Object[]): [] {
    let arrayKeys: any = [];
    arr.forEach(obj => {
      const objKeys: any = [];
      Object.keys(obj).forEach(key => objKeys.push(key));
      arrayKeys.push(objKeys);
    });
    return arrayKeys;
  }
}
