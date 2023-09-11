import { Component } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css']
})

export class HeroNewComponent {

  constructor(private heroService: HeroService) { }

  model: Hero = {id: 18, name: ''};

  submitted = false;

  onSubmit() { this.submitted = true; }

  // newHero() {
  //   this.model = new Hero(42, '', '');
  // }

  newHero(): void {
    this.heroService.postHero(this.model.name);
  }

}
