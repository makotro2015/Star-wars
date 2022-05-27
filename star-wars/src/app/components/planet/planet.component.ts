import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { HttpService } from 'src/app/services/http.service'

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {

  public planetData: {} = {};
  public planetDataRender: any[] = [];

  constructor(private http: HttpService) {
  }

  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.http
      .getData('planets/1/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        this.planetData = { ...resp };
        this.planetDataRender = this.getRenderPlanetData(this.planetData);
        console.log(this.planetDataRender);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public getRenderPlanetData(obj: any): String[] {
    const arrayData: String[] = [];
    Object.keys(obj).map(key => arrayData.push(`${key}: ${obj[key]}`))
    return arrayData;
  }
}
