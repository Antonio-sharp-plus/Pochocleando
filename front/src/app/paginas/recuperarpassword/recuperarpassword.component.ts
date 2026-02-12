import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-recuperarpassword',
  templateUrl: './recuperarpassword.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./recuperarpassword.component.css'],
})
export class RecuperarpasswordComponent {
  private apiGateway = environment.apiUrl + '/auth';

  nuevaPassword: string = '';
  confirmarPassword: string = '';
  token: string = '';
  mensaje: string = '';
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  enviar() {
    if (!this.nuevaPassword || !this.confirmarPassword) {
      this.error = 'Completa ambos campos.';
      return;
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.http
      .post(`${this.apiGateway}/auth/reset-password`, {
        token: this.token,
        password: this.nuevaPassword,
      })
      .subscribe({
        next: () => {
          this.mensaje =
            ' Contraseña restablecida con éxito. Redirigiendo al login...';
          this.error = '';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          this.error =
            err.error?.error ||
            'Ocurrió un error al restablecer la contraseña.';
          this.mensaje = '';
        },
      });
  }
}
