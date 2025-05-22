import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarEquipoComponent } from 'src/app/shared/component/agregar-equipo/agregar-equipo.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Equipo } from 'src/app/user.model';
@Component({
  selector: 'app-control-despacho',
  templateUrl: './control-despacho.page.html',
  styleUrls: ['./control-despacho.page.scss'],
})
export class ControlDespachoPage implements OnInit {

  areas = ['Transporte', 'Economia creativa', 'gestrion y Riesgo', 'asesoria legal', 'Despacho vice alcalde',
    'Despacho Alcalde', 'Informatica', 'Contabilidad', 'Tesoreria', 'Presupuesto', 'Direccion Financiera', 'Catastro', 'Urbanismo', 'UMAS', 'Medio Ambiente', 'Servicio General',
    'Secretaria del consejo', 'Auditorio', 'Panificacion', 'Inversiones Publicas', 'Adquisicion', 'Servicio Municipales',
    'Registro Civil', 'RRHH', 'Gerencia', 'Recaudacion', 'Fierro'
  ];

  filtro = {
    area: '',
    anio: ''
  };

  inventario: (Equipo & { numero: number })[] = [];

  textoBusqueda: string = '';


  inventarioFiltrado: any[] = [];



  filtrarEquipos() {
    const texto = this.textoBusqueda.toLowerCase();

    this.inventarioFiltrado = this.inventario.filter(item => {
      const coincideArea = !this.filtro.area || item.ubicacion === this.filtro.area;
      const coincideAnio = !this.filtro.anio || item.anio == this.filtro.anio;

      const coincideTexto = !this.textoBusqueda || (
        item.descripcion?.toLowerCase().includes(texto) ||
        item.codigo?.toLowerCase().includes(texto) ||
        item.marca?.toLowerCase().includes(texto) ||
        item.modelo?.toLowerCase().includes(texto) ||
        item.serie?.toLowerCase().includes(texto) ||
        item.estado?.toLowerCase().includes(texto) ||
        item.ubicacion?.toLowerCase().includes(texto)
      );

      return coincideArea && coincideAnio && coincideTexto;
    });
  }
  constructor(
    public modalController: ModalController,
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.filtrarEquipos();
    this.obtenerInventario();

  }

 obtenerInventario() {
  this.inventario = [];

  const solicitudes = this.areas.map(area =>
    this.firestore.collection(area).get().toPromise().then(snapshot => {
      snapshot.forEach(doc => {
        const data = doc.data() as Equipo;
        this.inventario.push({
          ...data,
          numero: this.inventario.length + 1
        });
      });
    })
  );

  Promise.all(solicitudes).then(() => {
    this.filtrarEquipos();
  }).catch(error => {
    console.error('Error al obtener los datos:', error);
  });
}

   async OpenModalSubir() {
    const modal = await this.modalController.create({
      component: AgregarEquipoComponent,
      mode: "ios",
    });
    await modal.present();

  }

}

