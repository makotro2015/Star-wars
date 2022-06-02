import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from 'src/app/services/http.service'
import { IPlanet, IResident, IPlanetsResp, IFilm } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {

  public planetsData: IPlanet[] = [];
  public currentPage = 1;
  public countPages = 1;

  constructor(private router: Router, private http: HttpService) {
  }

  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.getCurrentPagePlanetsData();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goToPlanetPage(url: string) {
    const arr = url.split('/');
    const planetId = arr[arr.length - 2]
    this.router.navigate([`planets/${planetId}/`])
  }

  public next() {
    if (this.currentPage !== this.countPages) {
      this.currentPage++;
      this.getCurrentPagePlanetsData();
    }
  }

  public back() {
    if (this.currentPage !== 1) {
      this.currentPage--;
      this.getCurrentPagePlanetsData();
    }
  }

  private getCurrentPagePlanetsData() {
    this.http
      .getData(`https://swapi.dev/api/planets/?page=${this.currentPage}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: IPlanetsResp) => {
        this.countPages = Math.ceil((resp.count as number) / (resp.results as IPlanet[]).length);
        this.planetsData = [...(resp.results as IPlanet[])];
      });
  }
}
