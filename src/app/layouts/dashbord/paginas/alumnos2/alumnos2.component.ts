import { Component, OnInit } from '@angular/core';
import { NotificacionService } from '../../../../core/notificacion/notificacion.service';
import { ListaService } from '../../../../core/listaAlumnos/lista.service';
import { AlumnoModelo } from './model';
import { SpinnerService } from '../../../../core/spinner/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { FormularioComponent } from './formulario/formulario.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alumnos2',
  templateUrl: './alumnos2.component.html',
  styleUrl: './alumnos2.component.scss'
})
export class Alumnos2Component{

  displayedColumns: string[] = ['Id','Nombre Completo','Email','Provincia','Ciudad','Nota','Accion'];
  criterio:string=""
  dataSource:AlumnoModelo[] = []

  constructor(
    private listaAlumno:ListaService,
    private alert:NotificacionService,
    private cargando:SpinnerService,
    public dialogo:MatDialog
    ){
      this.listaAlumno.datos$().subscribe({
        next:(val)=>this.dataSource = val
      })
      
    }
 



  crear(){
    this.dialogo.open(FormularioComponent).afterClosed().subscribe({
      next:(res)=>{
        if(res){
          this.listaAlumno.cargarAlumno(res).subscribe({
        next:(val)=>this.dataSource = val
      })
        }
      }
    })
  }


  editar(alumno:AlumnoModelo){
    this.dialogo.open(FormularioComponent,
      {
        data:alumno
      }).afterClosed().subscribe(
        {next:(res)=>{
          if(res){
            this.listaAlumno.editarAlumno(alumno.Id,res).subscribe({
              next:(val)=>{this.dataSource = val
              this.alert.actualizadoExito()}
            })
          }
        }}
      )
  }



  borrar(id:number){
    Swal.fire({
      title: "Atención!",
      text: "Desea eliminar este alumno?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "El alumno fue eliminado",
          icon: "success"
        });
  
        this.listaAlumno.borrar(id).subscribe(
      { next:(val) => this.dataSource = val})
      }
  
    });
    }
}