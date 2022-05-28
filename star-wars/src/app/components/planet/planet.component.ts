import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {

  public planetData: any = {};
  public peopleData: any = {};
  public speciesData: any = {};
  public planetKeys = [];
  public planetId: any = null;

  constructor(public route: ActivatedRoute, private http: HttpService) {
  }

  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.planetId = params["id"];
    });
    this.http
      .getData(`planets/${this.planetId}/`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: {}) => {
        this.planetData = { ...resp };
        this.planetKeys = this.getPlanetKeys(this.planetData);
      });
    this.http
      .getData(`people/`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        this.peopleData = [...resp.results];
        // console.log(this.peopleData)
        this.peopleData = this.peopleData.filter((obj: any) => {
          return obj.homeworld === this.planetData.url;
        })
      });
    this.http
      .getData(`species/`)
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: any) => {
        this.speciesData = [...resp.results];
        // console.log(this.peopleData)
        // console.log(this.peopleData.filter((obj: any) => {
        //   return obj.homeworld === this.planetData.url;
        // }))
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPlanetKeys(obj: {}): [] {
    const arrayKeys: any = [];
    Object.keys(obj).forEach(key => arrayKeys.push(key));
    return arrayKeys;
  }
}
