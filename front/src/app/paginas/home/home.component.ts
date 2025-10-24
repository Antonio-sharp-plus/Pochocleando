import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from "../../componentes/tarjeta/tarjeta.component";
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiGeneral } from '../../servicios/api.service';
import { RouterModule } from '@angular/router';
import { SearchbarComponent } from '../../componentes/searchbar/searchbar.component';


@Component({
  selector: 'app-home',
  imports: [TarjetaComponent, CommonModule, RouterModule, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  datos: any = [{}];
  tituloSeccion = "Lo más popular"
  datosOriginales: any[] = [];

  constructor(
    private snackBar: MatSnackBar, 
    private apiGeneral: ApiGeneral, 
  ) {}

  async ngOnInit() {
    this.apiGeneral.getTrending().subscribe(data => {
      this.datos = data;
      this.datosOriginales = Array.isArray(data) ? [...data] : []; // guardamos una copia original
    });
  }

  procesarResultados(resultados: any[]) {
    if (resultados && resultados.length > 0) {
      this.datos = resultados;
    } else {
      // si no hay resultados (por ejemplo, búsqueda vacía)
      this.datos = this.datosOriginales;
      this.tituloSeccion = "Lo más popular";
    }
  }

  actualizarTituloBusqueda(busqueda: string): void {
    if (busqueda && busqueda.trim()) {
      this.tituloSeccion = `Resultados para "${busqueda}"`;
    } else {
      // cuando el campo queda vacío -> restaurar originales y título
      this.tituloSeccion = "Lo más popular";
      this.datos = this.datosOriginales;
    }
  }

}