import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarEquipoComponent } from 'src/app/shared/component/agregar-equipo/agregar-equipo.component';

@Component({
  selector: 'app-control-despacho',
  templateUrl: './control-despacho.page.html',
  styleUrls: ['./control-despacho.page.scss'],
})
export class ControlDespachoPage implements OnInit {

  areas = ['Transporte', 'Economia creativa', 'gestrion y Riesgo','asesoria legal','Despacho vice alcalde',
    'Despacho Alcalde', 'Informatica','Contabilidad','Tesoreria','Presupuesto','Direccion Financiera','Catastro','Urbanismo','UMAS','Medio Ambiente','Servicio General',
    'Secretaria del consejo','Auditorio','Panificacion','Inversiones Publicas', 'Adquisicion','Servicio Municipales',
    'Registro Civil','RRHH','Gerencia','Recaudacion','Fierro'
  ];

filtro = {
  area: '',
  anio: ''
};

textoBusqueda: string = '';

  inventario: any[] = [];
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
     public modalController: ModalController
  ) { }

  ngOnInit() {
    // Simular datos por ahora
  this.inventario = [
    {
      numero: 1, descripcion: 'Laptop', codigo: 'ABC123', marca: 'HP', modelo: 'ProBook',
      serie: 'SN123456', color: 'Negro', anio: 2024, estado: 'Operativo',
      ubicacion: 'Gerencia', observacion: '', precio: 1200,Comprobante: 18520, Factura:548
    },
    {
      numero: 2, descripcion: 'Monitor', codigo: 'DEF456', marca: 'Dell', modelo: 'U2419H',
      serie: 'SN654321', color: 'Gris', anio: 2025, estado: 'Operativo',
      ubicacion: 'Contabilidad', observacion: '', precio: 800,Comprobante: 18520, Factura:548
    }
  ];
  this.filtrarEquipos();
   
  }

    async OpenModalSubir(){
        const modal = await this.modalController.create({
            component: AgregarEquipoComponent,
            mode: "ios",
          });
          await modal.present();
    
        }
  }

