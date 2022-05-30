import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class SearchPipe implements PipeTransform {
    transform(arr: any, search: any) {
        if (search === 'all') {
            return arr
        }
        if (search === 'male') {
            return arr.filter((obj: any) => {
                return obj.gender === 'male'
            })
        }
        if (search === 'female') {
            return arr.filter((obj: any) => {
                return obj.gender === 'female'
            })
        }
        return arr.filter((obj: any) => {
            return (obj.gender === 'unknow' || obj.gender === 'n/a')
        })
    }
}