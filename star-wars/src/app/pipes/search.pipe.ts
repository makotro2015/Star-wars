import { Pipe, PipeTransform } from '@angular/core';
import { IPlanet, IResident, IFilmResp, IFilm } from 'src/app/interfaces/interfaces';

@Pipe({
    name: 'filter'
})

export class SearchPipe implements PipeTransform {
    transform(residents: IResident[], search: string) {
        if (search === 'all') {
            return residents
        }
        if (search === 'male') {
            return residents.filter((resident: IResident) => {
                return resident.gender === 'male'
            })
        }
        if (search === 'female') {
            return residents.filter((resident: IResident) => {
                return resident.gender === 'female'
            })
        }
        return residents.filter((resident: IResident) => {
            return (resident.gender === 'unknow' || resident.gender === 'n/a')
        })
    }
}