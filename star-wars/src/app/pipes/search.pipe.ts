import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'search'
})

export class SearchPipe implements PipeTransform {
    transform(arr: any, value: any) {
        return arr.filter((el: any) => {
            return el[value[0]] === value[1]
        })
    }
}