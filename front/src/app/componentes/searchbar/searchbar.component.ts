import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, switchMap, filter, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ApiGeneral, ApiService, SeriesService } from '../../servicios/api.service';

@Component({
  selector: 'app-searchbar',
  imports: [FormsModule, CommonModule],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css'
})
export class SearchbarComponent implements OnInit {

  @Input() tipoBusqueda: 'pelicula' | 'series' | 'ambos' = 'ambos';
  @Output() resultados = new EventEmitter<any[]>();
  @Output() busquedaUsuario = new EventEmitter<string>();

  busqueda: string = '';

  private busquedaSubject = new Subject<string>();

  constructor(
    private apiGeneral: ApiGeneral, 
    private apiPeliculas: ApiService, 
    private apiSeries: SeriesService) {}

  ngOnInit(): void {

    this.busquedaSubject.pipe(
      debounceTime(300),
      switchMap((nombreBuscado) => {
        const termino = nombreBuscado.trim();

        if (!termino) {
          // si está vacío, emitimos un array vacío
          return of([]);
        }

        switch (this.tipoBusqueda) {
          case 'pelicula':
            //console.log(`se buscó ${nombreBuscado}`)
            return this.apiPeliculas.buscarPelicula(termino);
          case 'series':
            return this.apiSeries.buscarSerie(termino);
          case 'ambos':
          default:
            return this.apiGeneral.BusquedaGeneral(termino);
      }
      })
    ).subscribe((resultados: any[] | null) => {
      if (resultados) {
        this.resultados.emit(resultados);
      }
    });
  }

  onEscribir(): void {
    this.busquedaSubject.next(this.busqueda);
    this.busquedaUsuario.emit(this.busqueda);
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.busquedaSubject.next(this.busqueda);
    this.busquedaUsuario.emit(this.busqueda);
  }

}
