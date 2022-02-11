import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from "rxjs";
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 60%;
      border-radius: 10px;
      margin: auto;
      display: flex;
    }
  `]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };


  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {

    if (! this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroePorId(id))
      )
      .subscribe( heroe => this.heroe = heroe)
  }

  guardarHeroe() {
    if( this.heroe.superhero.trim().length === 0) {
      return;
    }

    if(this.heroe.id) {
      //actualizo heroe
      this.heroesService.editarHeroe(this.heroe)
      .subscribe(heroe => {
        console.log('Actualizando Heroe:', heroe)
      });
    } else {
      //guardar nuevo registro
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
      })
    }
  }

  borrarHeroe() {
    this.heroesService.borrarHeroe(this.heroe.id!)
    .subscribe( resp => {
      this.router.navigate(['/heroes']);
    })
  }

}
