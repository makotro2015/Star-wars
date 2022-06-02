import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Location } from '@angular/common';
import { HttpService } from 'src/app/services/http.service';
import { IPlanet, IResident, IFilmResp, IFilm } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {

  public planetData: IPlanet = {};
  public residentsData: IResident[] = []
  public filmsData: IFilm[] = []
  public planetId = 1;
  public residentsUrl = [];
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
      .subscribe((resp) => {
        this.planetData = { ...resp };
        if (this.planetData.residents) {
          this.planetData.residents.forEach((residentUrl: string) => {
            this.http
              .getData(residentUrl)
              .pipe(takeUntil(this.destroy$))
              .subscribe((resp: IResident) => {
                this.residentsData.push({ ...resp });
              });
          })
        }

      })

    this.http
      .getData(`https://swapi.dev/api/films/`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp) => {
        console.log(resp)
        const respData: IFilmResp = { ...resp }
        this.filmsData = (respData.results as IFilm[]);
        this.filmsData = this.filmsData.filter((film: IFilm) => {
          return (film.planets as string[]).includes(this.planetData.url as string);
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