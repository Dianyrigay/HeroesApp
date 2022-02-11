import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, switchMap } from "rxjs";

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
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
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }

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
      .subscribe(heroe => this.openSnackBar('Heroe actualizado'));
    } else {
      //guardar nuevo registro
      this.heroesService.agregarHeroe(this.heroe)
      .subscribe(heroe => {
        this.router.navigate(['/heroes/editar', heroe.id]);
        this.openSnackBar('Heroe creado');
      })
    }

  }

  borrarHeroe() {

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: {...this.heroe}
    });


    dialog.afterClosed().subscribe(
      (result) => {

        if(result) {
          this.heroesService.borrarHeroe(this.heroe.id!)
          .subscribe( resp => {
            this.router.navigate(['/heroes']);
          });
        }

      }
    )

    // dialog.afterClosed().pipe(
    //   switchMap( result => (result) ? this.heroesService.borrarHeroe(this.heroe.id!): new BehaviorSubject(false))
    // ).subscribe(resp => console.log(resp));
  }

  openSnackBar(mensaje: string) {
    this.snackBar.open(mensaje, 'ok!',{
      duration: 2500
    });
  }
}
