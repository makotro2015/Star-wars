import { Observer } from 'rxjs';

export interface IPlanet extends Object {
    climate?: string,
    created?: string,
    diameter?: string,
    edited?: string,
    films?: string[],
    gravity?: string,
    name?: string,
    orbital_period?: string,
    population?: string,
    residents?: string[],
    rotation_period?: string,
    surface_water?: string,
    terrain?: string,
    url?: string,
}

export interface IResident extends Object {
    birth_year?: string,
    created?: string,
    edited?: string,
    eye_color?: string,
    films?: string[],
    gender?: string,
    hair_color?: string,
    height?: string,
    homeworld?: string,
    mass?: string,
    name?: string,
    skin_color?: string,
    species?: string[],
    starships?: string[],
    url?: string,
    vehicles?: string[],
}

export interface IFilmResp extends Object {
    count?: number,
    next?: null,
    previous?: null,
    results?: IFilm[],
}

export interface IFilm extends Object {
    characters?: string[],
    created?: string,
    edited?: string,
    director?: string,
    episode_id?: number,
    opening_crawl?: string,
    planets?: string[],
    producer?: string,
    release_date?: string,
    species?: string[],
    starships?: string[],
    title?: string,
    url?: string,
    vehicles?: string[],
}

export interface IPlanetsResp extends Object {
    count?: number,
    next?: null,
    previous?: null,
    results?: IPlanet[],
}