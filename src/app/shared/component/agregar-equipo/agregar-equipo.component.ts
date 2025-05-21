import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrls: ['./agregar-equipo.component.scss'],


})
export class AgregarEquipoComponent  implements OnInit {

  equipo: any = {
    numero: null,
    descripcion: '',
    codigo: '',
    marca: '',
    modelo: '',
    serie: '',
    color: '',
    anio: null,
    estado: '',
    ubicacion: '',
    observacion: '',
    precio: null
  };

  areas = ['Transporte', 'Economia creativa', 'gestrion y Riesgo','asesoria legal','Despacho vice alcalde',
    'Despacho Alcalde', 'Informatica','Contabilidad','Tesoreria','Presupuesto','Direccion Financiera','Catastro','Urbanismo','UMAS','Medio Ambiente','Servicio General',
    'Secretaria del consejo','Auditorio','Panificacion','Inversiones Publicas', 'Adquisicion','Servicio Municipales',
    'Registro Civil','RRHH','Gerencia','Recaudacion','Fierro'
  ];
  modalCtrl: any;
  constructor() { }

  ngOnInit() {}

   cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    this.modalCtrl.dismiss(this.equipo);
  }

}
