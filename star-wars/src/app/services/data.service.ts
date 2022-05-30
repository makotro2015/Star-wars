import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
    providedIn: 'root',
})
export class DataService {

    planetData: any = {};
    residentsData: any = [];
    filmsData: any = [];
    residentsUrl: any = [];

    constructor(private http: HttpService) { console.log('service') }

    // public getData(planetId: any) {
    //     console.log('getData')
    //     debugger;
    //     this.requests(planetId)
    //     return [this.planetData, this.residentsData, this.filmsData]
    // }

    // returnData() {
    //     console.log('returnData')
    //     return [this.planetData, this.residentsData, this.filmsData]
    // }

    public requests(planetId: any) {
        console.log('requests')
        return this.http
            .getData(`planets/${planetId}/`)
            // .subscribe((resp: any) => ({ ...resp }))

        //     this.residentsUrl = [...this.planetData.residents];
        //         this.residentsUrl.forEach((residentUrl: any) => {
        //             residentUrl = residentUrl.split('/');
        //             const residentId = residentUrl[residentUrl.length - 2];
        //             this.http
        //                 .getData(`people/${residentId}/`)
        //                 .subscribe((resp: any) => {
        //                     this.residentsData.push({ ...resp });
        //                 });
        //         })
        // this.http
        //     .getData(`films/`)
        //     .subscribe((resp: any) => {
        //         this.filmsData = [...resp.results];
        //         this.filmsData = this.filmsData.filter((obj: any) => {
        //             return obj.planets.includes(this.planetData.url);
        //         })
        //     });
    }
}

// import { Injectable } from '@angular/core';
// import { HttpService } from 'src/app/services/http.service';

// @Injectable({
//     providedIn: 'root',
// })
// export class DataService {

//     planetData: any = {};
//     residentsData: any = [];
//     filmsData: any = [];
//     residentsUrl: any = [];

//     constructor(private http: HttpService) { console.log('service') }

//     public getData(planetId: any) {
//         console.log('getData')
//         debugger;
//         this.requests(planetId)
//         return [this.planetData, this.residentsData, this.filmsData]
//     }

//     returnData() {
//         console.log('returnData')
//         return [this.planetData, this.residentsData, this.filmsData]
//     }

//     public requests(planetId: any) {
//         console.log('requests')
//         this.http
//             .getData(`planets/${planetId}/`)
//             .subscribe((resp: any) => {
//                 this.planetData = { ...resp };
//                 this.residentsUrl = [...this.planetData.residents];
//                 this.residentsUrl.forEach((residentUrl: any) => {
//                     residentUrl = residentUrl.split('/');
//                     const residentId = residentUrl[residentUrl.length - 2];
//                     this.http
//                         .getData(`people/${residentId}/`)
//                         .subscribe((resp: any) => {
//                             this.residentsData.push({ ...resp });
//                         });
//                 })
//             });
//         this.http
//             .getData(`films/`)
//             .subscribe((resp: any) => {
//                 this.filmsData = [...resp.results];
//                 this.filmsData = this.filmsData.filter((obj: any) => {
//                     return obj.planets.includes(this.planetData.url);
//                 })
//             });
//     }
// }
