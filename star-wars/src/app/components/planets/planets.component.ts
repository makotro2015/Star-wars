import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {

  public planetsData: any = [];

  constructor(private router: Router, private http: HttpService) {
  }

  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.http
      .getData('https://swapi.dev/api/planets/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        this.planetsData = [...resp.results];
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goToPlanetPage(url: any) {
    const arr = url.split('/');
    const planetId = arr[arr.length - 2]
    this.router.navigate([`planets/${planetId}/`])
  }
}
