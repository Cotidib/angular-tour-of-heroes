import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  // getHeroes(): Observable<Hero[]> {
  // const heroes = of(HEROES);
  // this.messageService.add('HeroService: fetched heroes');
  // return heroes;
  // }

  url = 'http://localhost:3000/heroes';

  async getHeroes(): Promise<Hero[]> {
    const data = await fetch(this.url);
    const heroes = await data.json() ?? [];
    return heroes;
  }

  // getHero(id: number): Observable<Hero> {
  //   // For now, assume that a hero with the specified `id` always exists.
  //   // Error handling will be added in the next step of the tutorial.
  //   const hero = HEROES.find(h => h.id === id)!;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }

  async getHero(id: number): Promise<Hero | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const hero = await data.json() ?? {};
    return hero;
  }

  async getSize(){
    const url_size = `http://localhost:3000/size`;
    let response = await fetch(url_size);
    const size = await response.json();
    return size.count;
  }

  async putSize(new_count: number){
    const url_size = `http://localhost:3000/size`;
    fetch(url_size, {
    method: "PUT",
    body: JSON.stringify({
      count: new_count
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })};

  async postHero(name: string) {
    let current_size = await this.getSize();

    await fetch(this.url, {
      method: "POST",
      body: JSON.stringify({
        name: name
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }).then((response) => 
    {
      if(response.status == 201){
        this.putSize(current_size + 1);
      }
    }
  );
  }
}
