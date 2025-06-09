import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-agregar-equipo',
  templateUrl: './agregar-equipo.component.html',
  styleUrls: ['./agregar-equipo.component.scss'],


})
export class AgregarEquipoComponent implements OnInit {

  @Input() equipos: any;
  @Input() soloLectura = false;
  @Input() user: any

  userArea: string = '';
  isAdmin: boolean = false;
  Areas: string[] = [];
  areaBloqueada = false;

  equipo: any = {
    numero: null,
    descripcion: '',
    codigo_Contable: '',
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

  /*areas = ['Transporte', 'Economia creativa', 'gestrion y Riesgo', 'asesoria legal', 'Despacho vice alcalde',
    'Despacho Alcalde', 'Informatica', 'Contabilidad', 'Tesoreria', 'Presupuesto', 'Direccion Financiera', 'Catastro', 'Urbanismo', 'UMAS', 'Medio Ambiente', 'Servicio General',
    'Secretaria del consejo', 'Auditorio', 'Panificacion', 'Inversiones Publicas', 'Adquisicion', 'Servicio Municipales',
    'Registro Civil', 'RRHH', 'Gerencia', 'Recaudacion', 'Fierro'
  ];*/

  constructor(public firestore: AngularFirestore,
    public service: LoadingService,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit() {
   const areas = [
      'Transporte', 'Economia creativa', 'gestion y Riesgo', 'asesoria legal',
      'Despacho vice alcalde', 'Despacho Alcalde', 'Informatica', 'Contabilidad',
      'Tesoreria', 'Presupuesto', 'Direccion Financiera', 'Catastro', 'Urbanismo',
      'UMAS', 'Medio Ambiente', 'Servicio General', 'Secretaria del consejo',
      'Auditorio', 'Panificacion', 'Inversiones Publicas', 'Adquisicion',
      'Servicio Municipales', 'Registro Civil', 'RRHH', 'Gerencia', 'Recaudacion', 'Fierro'
    ];

    const esAdminOGerente = this.user?.Rol === 'admin' || this.user?.Rol === 'Gerente';

    if (esAdminOGerente) {
      this.Areas = areas;
    } else if (this.user?.area) {
       this.Areas = [this.user.area]; // Solo su área
      this.equipo.ubicacion = this.user.area; // Preseleccionarla
    } else {
       this.Areas = [];
    }
  }

  async guardar() {
    if (!this.equipo.ubicacion) {
      alert('Debe seleccionar una ubicación (área).');
      return;
    }
    const loading = await this.service.loading('Cargando...', 'crescent');

    const nombreColeccion = this.equipo.ubicacion;

    this.firestore.collection(nombreColeccion).add(this.equipo)
      .then(() => {
        this.service.hide(loading);
        this.service.toast('Usuario creado exitosamente', 2000, 'middle', 'success');
        this.equipo = {
          codigo_Contable: '',
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
