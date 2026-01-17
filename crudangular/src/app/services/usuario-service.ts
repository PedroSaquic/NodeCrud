import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient){}

  //Obtener usuarios
  getUsuarios(): Observable <UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(this.apiUrl)
  }

  //Crear usuario
  addUsuario(newUsuario: UsuarioModel): Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(this.apiUrl, newUsuario);
  }

  //Actualizar usuario existente
  updateUsuario(id: number, newUsuario: UsuarioModel): Observable <UsuarioModel>{
    return this.http.put<UsuarioModel>(`${this.apiUrl}/${id}`, newUsuario);
  }

  //Eliminar usuario existente
  deleteUsuario(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

}
