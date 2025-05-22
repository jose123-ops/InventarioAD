import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrls: ['./agregar-equipo.component.scss'],


})
export class AgregarEquipoComponent implements OnInit {

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

  areas = ['Transporte', 'Economia creativa', 'gestrion y Riesgo', 'asesoria legal', 'Despacho vice alcalde',
    'Despacho Alcalde', 'Informatica', 'Contabilidad', 'Tesoreria', 'Presupuesto', 'Direccion Financiera', 'Catastro', 'Urbanismo', 'UMAS', 'Medio Ambiente', 'Servicio General',
    'Secretaria del consejo', 'Auditorio', 'Panificacion', 'Inversiones Publicas', 'Adquisicion', 'Servicio Municipales',
    'Registro Civil', 'RRHH', 'Gerencia', 'Recaudacion', 'Fierro'
  ];
  modalCtrl: any;
  constructor(public firestore: AngularFirestore) { }

  ngOnInit() { }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  guardar() {
    if (!this.equipo.ubicacion) {
      alert('Debe seleccionar una ubicación (área).');
      return;
    }

    const nombreColeccion = this.equipo.ubicacion; // Ej: "Finanzas", "TI", etc.

    this.firestore.collection(nombreColeccion).add(this.equipo)
      .then(() => {
        alert('Equipo guardado exitosamente en la colección: ' + nombreColeccion);
        this.equipo = {
          codigo: '',
          descripcion: '',
          marca: '',
          modelo: '',
          serie: '',
          color: '',
          anio: null,
          estado: '',
          ubicacion: '',
          precio: '',
          comprobante: '',
          factura: '',
          observacion: '',


        };
      })
      .catch((error) => {
        console.error('Error al guardar el equipo:', error);
        alert('Hubo un error al guardar el equipo');
      });
  }
}
