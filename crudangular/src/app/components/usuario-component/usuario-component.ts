import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario-service';
import { UsuarioModel } from '../../models/usuario-model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-usuario-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-component.html',
  styleUrl: './usuario-component.css',
})
export class UsuarioComponent implements OnInit{
  listaUsuarios: UsuarioModel[] = [];
  MdUsuario: UsuarioModel = {nombre: '', email: ''};
  editando: boolean = false;
  idEditando: number | null = null;

  constructor(private usuarioServicio: UsuarioService,
              private cdr: ChangeDetectorRef){} 

  ngOnInit(): void{
    this.getUsuarios();
  }

  //GET cargar usuarios
  getUsuarios(): void{
    this.usuarioServicio.getUsuarios().subscribe(data =>{
      this.listaUsuarios = data;
      this.cdr.detectChanges();
    })
  }

  //PUT o POST actualizar o crear usuarios
  guardarUsuarios(): void{
    if(this.editando && this.idEditando !== null){
            //si estamos editando, enviaremos Put
      this.usuarioServicio.updateUsuario(this.idEditando, this.MdUsuario).subscribe(() =>{
        this.getUsuarios(); 
        this.resetFormulario();
      });
    }else{
            //no estamos edidtando, crear post
      this.usuarioServicio.addUsuario(this.MdUsuario).subscribe(()=>{
        this.getUsuarios();
        this.resetFormulario();
      });
    }
  }

  //LLENAR formulario
  editar(existusuario: UsuarioModel): void{
    this.MdUsuario = { ...existusuario };
    this.editando = true;
    this.idEditando = existusuario.id!;
  }

  //DELETE eliminar usuarios
  eliminar(id: number): void{
    this.usuarioServicio.deleteUsuario(id).subscribe(()=>{
      this.getUsuarios();
    })
  }

  //RESET restablecer formulario
  resetFormulario(): void{
    this.MdUsuario = { nombre: '', email: ''};
    this.editando = false;
    this.idEditando = null;
  }
}
