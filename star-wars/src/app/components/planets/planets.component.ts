import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss']
})
export class PlanetsComponent implements OnInit, OnDestroy {

  public planets: any[] = [];
  public keysPlanet: any[] = [];

  constructor(private http: HttpService) {
  }

  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.http
      .getData('planets/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        this.planets = [...resp.results];
        console.log(...resp.results);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // public getKeysObj (obj: {}): String[] {
  //   return Object.keys(obj).map(key => `<p>${key}</p>`)
  //   }
}
