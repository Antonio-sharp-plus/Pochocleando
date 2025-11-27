import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, switchMap, of, catchError } from 'rxjs';
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
        if (!nombreBuscado.trim()) return of([]);

        let peticion;

        // Seleccionamos la petición correspondiente
        switch (this.tipoBusqueda) {
          case 'pelicula':
            peticion = this.apiPeliculas.buscarPelicula(nombreBuscado);
            break;
          case 'series':
            peticion = this.apiSeries.buscarSerie(nombreBuscado);
            break;
          case 'ambos':
          default:
            peticion = this.apiGeneral.BusquedaGeneral(nombreBuscado);
            break;
        }

        // Añadimos un pipe interno a la petición. Si falla, retornamos array vacío.
        return peticion.pipe(
          catchError(error => {
            console.error('Error en la búsqueda:', error);
            return of([]); // Retorna array vacío en vez de matar el flujo
          })
        );
      })
    ).subscribe((resultados: any[]) => {
      if (this.busqueda.trim()) {
        this.resultados.emit(resultados);
      }
    });
  }

  onEscribir(): void {
    const valor = this.busqueda.trim();
  
    this.busquedaSubject.next(valor);

    if (valor) {
      this.busquedaUsuario.emit(valor);
    } else {
      this.resultados.emit([]);            // limpia resultados visualmente
      this.busquedaUsuario.emit('');       // avisa al padre para cargar Populares
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.busquedaSubject.next(this.busqueda);
    this.busquedaUsuario.emit(this.busqueda);
  }

}
