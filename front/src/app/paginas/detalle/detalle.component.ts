import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { ApiGeneral } from '../../servicios/api.service';
import { Subscription } from 'rxjs';
import { FavoritosService } from '../../servicios/favoritos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ResenasService } from '../../servicios/resenas.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
})
export class DetalleComponent implements OnInit {
  data: any = {};

  proveedores: any = {};
  listaProveedores: any = [];
  pais: string = ''; //para ver de donde nos tira proveedores
  countryShown: string = ''; // 'AR' | 'US' | ''
  mostrarPreguntaUS: boolean = false;

  private subscription?: Subscription; // Para gestionar la desuscripción

  comentario: string = ''; //input reseña
  resenas: any[] = []; // Para almacenar reseñas

  estaEnLosFavs: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiGeneral: ApiGeneral,
    private favoritosService: FavoritosService,
    private snackBar: MatSnackBar,
    private resenasService: ResenasService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    const tipo = this.route.snapshot.params['tipo'];
    console.log(id, tipo);

    // Traer todas las reseñas de este contenido (de todos los usuarios)
    this.resenasService
      .obtenerResenasPorContenido(id)
      .subscribe((data) => (this.resenas = data));

    // Cargar datos de la película/serie
    this.subscription = this.apiGeneral.BusquedaId(id, tipo).subscribe({
      next: (datos) => {
        this.data = datos;
        console.log('Datos recibidos:', this.data);
        this.verificarFavorito(id);
      },
      error: (err) => console.error('Error al cargar datos:', err),
    });

    //Traemos los proveedores de Argentina
    this.subscription = this.apiGeneral.Proveedores(id, tipo, 'AR').subscribe({
      next: (datos) => {
        this.proveedores = datos || {};
        const dataAR = this.proveedores['AR'];

        if (dataAR) {
          this.pais = 'AR';
          this.countryShown = 'AR';
          this.listaProveedores = this.mapProviders(dataAR);
        } else {
          // No hay proveedores en AR -> mostrar mensaje con pregunta
          this.pais = '';
          this.countryShown = '';
          this.listaProveedores = [];
          this.mostrarPreguntaUS = true;
        }
      },
      error: (err) => console.error('Error al cargar proveedores ñaña:', err),
    });
  }

  private mapProviders(data: any): any[] {
    const todos = [
      ...(data?.buy || []),
      ...(data?.rent || []),
      ...(data?.flatrate || []),
    ];

    const mapa = new Map<string, { name: string; logo: string }>();
    for (const p of todos) {
      if (!p) continue;
      mapa.set(p.provider_name, {
        name: p.provider_name,
        logo: 'https://image.tmdb.org/t/p/original' + p.logo_path,
      });
    }
    return Array.from(mapa.values());
  }

  cargarProveedoresUS(): void {
    const id = this.route.snapshot.params['id'];
    const tipo = this.route.snapshot.params['tipo'];
    this.apiGeneral.Proveedores(id, tipo, 'US').subscribe({
      next: (datos) => {
        const dataUS = (datos || {})['US'];
        this.countryShown = 'US';
        this.mostrarPreguntaUS = false;
        this.listaProveedores = dataUS ? this.mapProviders(dataUS) : [];
      },
      error: (err) => {
        this.countryShown = 'US';
        this.mostrarPreguntaUS = false;
        this.listaProveedores = [];
        console.error('Error al cargar proveedores US:', err);
      },
    });
  }

  rechazarUS(): void {
    this.mostrarPreguntaUS = false;
    this.countryShown = '';
  }

  ngOnDestroy(): void {
    // Limpieza de la suscripción
    this.subscription?.unsubscribe();
  }

  verificarFavorito(id: string): void {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userId = user._id || user.id || '';

    if (!userId) return;

    this.favoritosService.obtenerFavoritos(userId).subscribe({
      next: (favoritos) => {
        this.estaEnLosFavs = favoritos.some(
          (fav) => String(fav.id) === String(id)
        );

        // console.log('Favorito a agregar:', favorito);
        // console.log('Favoritos existentes:', favoritos);
      },
      error: () => {
        this.snackBar.open('Error al verificar favoritos...', 'Cerrar', {
          duration: 2000,
        });
      },
    });
  }

  agregarOEliminarDeFavoritos() {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userId = user._id || user.id || '';

    if (!userId) {
      this.snackBar.open(
        'Debes iniciar sesión para gestionar favoritos',
        'Cerrar',
        { duration: 2000 }
      );
      return;
    }

    const tipo = this.route.snapshot.params['tipo'];

    const favorito = {
      id: this.data.id,
      titulo: this.data.title || this.data.name,
      poster: this.data.poster_path,
      anio: this.data.release_date || this.data.first_air_date,
      tipo: tipo,
      puntaje: this.data.vote_average,
    };

    if (this.estaEnLosFavs) {
      // todo esto para sacar de los favs
      this.favoritosService.eliminarFavorito(userId, favorito.id).subscribe({
        next: () => {
          this.snackBar.open('¡Eliminado de favoritos!', 'Cerrar', {
            duration: 2000,
          });
          this.estaEnLosFavs = false; // actualizo porque lo saqué
        },
        error: () =>
          this.snackBar.open('Error al eliminar de favoritos...', 'Cerrar', {
            duration: 2000,
          }),
      });
    } else {
      // todo esto para agregarlo a favs
      this.favoritosService.agregarFavorito(userId, favorito).subscribe({
        next: () => {
          this.snackBar.open('¡Agregado a favoritos!', 'Cerrar', {
            duration: 2000,
          });
          this.estaEnLosFavs = true; // actualizo porque lo agregué, obvio
        },
        error: () =>
          this.snackBar.open('Error al agregar a favoritos...', 'Cerrar', {
            duration: 2000,
          }),
      });
    }
  }

  agregarResena() {
    const user = JSON.parse(localStorage.getItem('usuario') || '{}');
    const userId = user._id || user.id || '';
    if (!userId) {
      alert('Debes iniciar sesión para agregar una reseña');
      return;
    }

    const tipo = this.route.snapshot.params['tipo'];
    const resena = {
      contenidoId: this.data.id,
      tipo: tipo,
      titulo: this.data.title || this.data.name,
      comentario: this.comentario,
    };

    this.resenasService.agregarResena(userId, resena).subscribe({
      next: () => {
        alert('¡Reseña agregada!');
        this.comentario = '';
        this.resenasService
          .obtenerResenasPorContenido(this.data.id)
          .subscribe((data) => (this.resenas = data));
      },
      error: (err) => {
        alert('Error al agregar reseña');
        console.error(err);
      },
    });
  }

  volver() {
    // Vuelve a la página anterior; si no hay historial, navega a home
    if (window.history.length > 1) {
      this.location.back();
    } else {
      window.location.href = '/';
    }
  }
}
