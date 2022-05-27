import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-planet',
  templateUrl: './planet.component.html',
  styleUrls: ['./planet.component.scss']
})
export class PlanetComponent implements OnInit, OnDestroy {

  public planetData = {};
  public planetKeys = [];

  constructor(private http: HttpService) {
  }

  private destroy$: Subject<void> = new Subject();

  ngOnInit() {
    this.http
      .getData('planets/1/')
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp: {}) => {
        console.log(resp);
        this.planetData = { ...resp };
        this.planetKeys = this.getPlanetKeys(this.planetData);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getPlanetKeys(obj: {}): [] {
    const arrayKeys: any = [];
    Object.keys(obj).map(key => arrayKeys.push(key));
    return arrayKeys;
  }
}
