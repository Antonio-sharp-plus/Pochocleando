import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TarjetaComponent } from '../../componentes/tarjeta/tarjeta.component';
import { SeriesService } from '../../servicios/api.service';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from '../../componentes/searchbar/searchbar.component';

@Component({
  selector: 'app-series',
  imports: [CommonModule, TarjetaComponent, RouterModule, SearchbarComponent],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit{

  datos: any = [{}]; 
  datosOriginales: any[] = [];
  tituloSeccion = "Series populares";
  tipo = 'tv';

  paginaActual: number = 1;
  totalPaginas: number = 10;
  categoriaActual: string = 'populares';

  constructor(
    private snackBar: MatSnackBar, 
    private seriesService: SeriesService,
  ) {}

  async ngOnInit() {
    this.seriesService.getSeriesPopulares(1).subscribe(data => {
      this.datos = data;
      this.datosOriginales = data; // guardamos la copia original
    });
  }

  botones = ["filter-btn active", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn", "filter-btn"]

  async SeriesPopulares(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Series populares";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.categoriaActual = 'populares';
    this.paginaActual = page;

    this.seriesService.getSeriesPopulares(page).subscribe(data => {
      this.datos = data;
      this.datosOriginales = data;
    });
  }

  async SeriesMejorValoradas(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Series mejor valoradas";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.categoriaActual = 'valoradas';
    this.paginaActual = page;

   this.seriesService.getSeriesValoradas(page).subscribe(data => {
      this.datos = data;
      this.datosOriginales = data;
    });
  }

  async SeriesComedia(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Series de comedia";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.categoriaActual = 'comedia';
    this.paginaActual = page;

    this.seriesService.getSeriesComedia(page).subscribe(data => {
      this.datos = data;
      this.datosOriginales = data;
    });
  }

  async SeriesDrama(boton: number, page: number = 1): Promise<void>{
    this.tituloSeccion = "Series de drama";

    for (let i = 0; i <= 3; i++) {
      this.botones[i] = "filter-btn";
    }
    this.botones[boton] = "filter-btn active";

    this.categoriaActual = 'drama';
    this.paginaActual = page;

   this.seriesService.getSeriesDrama(page).subscribe(data => {
      this.datos = data;
      this.datosOriginales = data;
    });
  }
  
  procesarResultados(resultados: any[]) {
    if (resultados && resultados.length > 0) {
      this.datos = resultados;
    } else {
      // si no hay resultados o búsqueda vacía, restauramos los originales
      this.datos = this.datosOriginales;
      this.tituloSeccion = "Series populares";
    }
  }

  actualizarTituloBusqueda(busqueda: string): void {
    if (busqueda.trim()) {
      this.tituloSeccion = `Resultados para "${busqueda}"`;
    } else {
      this.tituloSeccion = "Series populares";
    }
  }

    irAPagina(page: number) {
    if (page < 1 || page > this.totalPaginas) return;

    const botonActivo = this.botones.findIndex(b => b.includes('active'));

    switch(this.categoriaActual) {
      case 'populares':
        this.SeriesPopulares(botonActivo, page);
        break;
      case 'valoradas':
        this.SeriesMejorValoradas(botonActivo, page);
        break;
      case 'comedia':
        this.SeriesComedia(botonActivo, page);
        break;
      case 'drama':
        this.SeriesDrama(botonActivo, page);
        break;
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.irAPagina(this.paginaActual - 1);
    }
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.irAPagina(this.paginaActual + 1);
    }
  }

}