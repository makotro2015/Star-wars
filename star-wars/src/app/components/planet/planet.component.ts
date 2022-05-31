import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {

  public planetData: any = {};
  public residentsData: any = []
  public filmsData: any = []
  public planetId: any = null;
  public residentsUrl: any = null;
  public search = 'all';

  constructor(public route: ActivatedRoute, private http: HttpService, private location: Location) {
  }

  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.planetId = params["id"];
    });
    this.http
      .getData(`https://swapi.dev/api/planets/${this.planetId}/`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: {}) => {
        this.planetData = { ...resp };
        this.planetData.residents.forEach((residentUrl: any) => {
          this.http
            .getData(residentUrl)
            .pipe(takeUntil(this.destroy$))
            .subscribe((resp: any) => {
              this.residentsData.push({ ...resp });
            });
        })
      })

    this.http
      .getData(`https://swapi.dev/api/films/`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        console.log(resp)
        this.filmsData = [...resp.results];
        this.filmsData = this.filmsData.filter((obj: any) => {
          return obj.planets.includes(this.planetData.url);
        })
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goBack() {
    this.location.back();
  }

}