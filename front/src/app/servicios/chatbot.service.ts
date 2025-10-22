import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Interface para tipar la respuesta del backend
interface ChatbotResponse {
  prompt?: string;
  recomendacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = `${environment.apiUrl}/chatbot`;

  constructor(private http: HttpClient) {}

  enviarPregunta(pregunta: string): Observable<ChatbotResponse> {
      return this.http.post<ChatbotResponse>(this.apiUrl, { prompt: pregunta });
  }
}