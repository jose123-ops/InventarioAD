import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AgregarEquipoComponent } from 'src/app/shared/component/agregar-equipo/agregar-equipo.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Equipo } from 'src/app/user.model';
import { VerEquipoComponent } from 'src/app/shared/component/ver-equipo/ver-equipo.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-control-despacho',
  templateUrl: './control-despacho.page.html',
  styleUrls: ['./control-despacho.page.scss'],
})
export class ControlDespachoPage implements OnInit {

  rolAreaMap: { [key: string]: string } = {
    'admin': 'TODAS',
    'Gerente': 'TODAS',
    'Jefe_Bodega': 'TODAS',
    'Auxiliar_Bodega': 'TODAS',
    'Resp_Informatica': 'Informatica',
    'Resp_Trasporte': 'Transporte',
    'Resp_Economia_Creativa': 'Economia creativa',
    'Resp_UMGIR': 'gestion y Riesgo',
    'Resp_Asesoria_Legal': 'asesoria legal',
    'Resp_Mercado': 'Mercado',
    'Vice_Alcalde': 'Despacho vice alcalde',
    'Alcalde': 'Despacho Alcalde',
    'Resp_catastro': 'Catastro',
    'Resp_Urbanismo': 'Urbanismo',
    'Resp_UMAS': 'UMAS',
    'Resp_Medio_Ambiente': 'Medio Ambiente',
    'Secretaria_Consejo': 'Secretaria del consejo',
    'Resp_Finanza': 'Direccion Financiera',
    'Resp_Presupuesto': 'Presupuesto',
    'Resp_Contabilidad': 'Contabilidad',
    'Resp_Tesoreria': 'Tesoreria',
    'Resp_RRHH': 'RRHH',
    'Resp_Servicios_Municipales': 'Servicio Municipales',
    'Resp_Registro_Civil': 'Registro Civil',
    'Resp_Adquisiciones': 'Adquisicion',
    'Resp_Recaudacion': 'Recaudacion',
    'Resp_Proyecto': 'Inversiones Publicas',
    'Resp_Planificacion': 'Panificacion'
  };

  user: any;
  isAdmin: boolean = false;
  isbaja: boolean = false
  userArea: string = '';

  /*areas =this.isAdmin ? ['Todos', 'Transporte', 'Economia creativa', 'gestrion y Riesgo', 'asesoria legal', 'Despacho vice alcalde',
    'Despacho Alcalde', 'Informatica', 'Contabilidad', 'Tesoreria', 'Presupuesto', 'Direccion Financiera', 'Catastro', 'Urbanismo', 'UMAS', 'Medio Ambiente', 'Servicio General',
    'Secretaria del consejo', 'Auditorio', 'Panificacion', 'Inversiones Publicas', 'Adquisicion', 'Servicio Municipales',
    'Registro Civil', 'RRHH', 'Gerencia', 'Recaudacion', 'Fierro'
  ]:[];*/

  filtro = {
    area: '',
    anio: ''
  };

  inventario: (Equipo & { numero: number })[] = [];
  textoBusqueda: string = '';
  inventarioFiltrado: any[] = [];
  itemsPorPagina: number = 10;
  paginaActual: number = 1;
  todosLosEquipos: any[] = [];
  equiposFiltrados: any[] = [];
  areas: string[];
  todasLasAreas: any;

  isGerente: boolean = false;
  isJefeBodega: boolean = false;
  isAuxBodega: boolean = false;
  isUsuarioNormal: boolean = false;





  filtrarEquipos() {
    const texto = this.textoBusqueda.toLowerCase();
    const areaFiltro = this.isAdmin ? this.filtro.area : this.userArea;

    this.equiposFiltrados = this.inventario.filter(item => {
      const coincideArea = areaFiltro === 'Todos' || !areaFiltro || item.ubicacion === areaFiltro;
      const coincideAnio = this.filtro.anio === 'Todos' || !this.filtro.anio || item.anio == this.filtro.anio;

      const coincideTexto = !this.textoBusqueda || (
        item.descripcion?.toLowerCase().includes(texto) ||
        item.codigo_Contable?.toLowerCase().includes(texto) ||
        item.codigo?.toLowerCase().includes(texto) ||
        item.marca?.toLowerCase().includes(texto) ||
        item.modelo?.toLowerCase().includes(texto) ||
        item.serie?.toLowerCase().includes(texto) ||
        item.estado?.toLowerCase().includes(texto) ||
        item.ubicacion?.toLowerCase().includes(texto)
      );

      return coincideArea && coincideAnio && coincideTexto;
    });

    this.paginaActual = 1;
    this.actualizarPaginacion();
  }

  constructor(
    public modalController: ModalController,
    public firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private alertController: AlertController,
  ) { }

  ngOnInit() {

    this.User()
    this.filtrarEquipos();
    this.obtenerInventario();

  }

  User() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        const uid = user.uid;
        this.firestore.collection('users').doc(uid).valueChanges().subscribe((usuarioData: any) => {
          if (usuarioData) {
            this.user = usuarioData;

            const rol = usuarioData.Rol;
            this.isAdmin = rol === 'admin' || rol === 'Gerente' || rol === 'Jefe_Bodega';

            this.isGerente = rol === 'Gerente';
            this.isJefeBodega = rol === 'Jefe_Bodega';
            this.isAuxBodega = rol === 'Auxiliar_Bodega';
            this.isUsuarioNormal = !this.isAdmin && !this.isGerente && !this.isJefeBodega && !this.isAuxBodega;

            const areaPorRol = this.rolAreaMap[rol];
            this.userArea = areaPorRol || usuarioData.area || '';


            if (this.isAdmin) {
              this.areas = ['Todos', 'Transporte', 'Economia creativa', 'gestrion y Riesgo', 'asesoria legal',
                'Despacho vice alcalde', 'Despacho Alcalde', 'Informatica', 'Contabilidad', 'Tesoreria',
                'Presupuesto', 'Direccion Financiera', 'Catastro', 'Urbanismo', 'UMAS', 'Medio Ambiente',
                'Servicio General', 'Secretaria del consejo', 'Auditorio', 'Panificacion', 'Inversiones Publicas',
                'Adquisicion', 'Servicio Municipales', 'Registro Civil', 'RRHH', 'Gerencia', 'Recaudacion', 'Fierro'];
            } else if (this.userArea) {
              this.areas = [this.userArea]; // Solo su área
            } else {
              this.areas = []; // Si no tiene área, no se muestra ningún filtro
            }

            // Solo llamamos al inventario después de tener el rol y área definidos
            this.obtenerInventario();
          }
        });
      }
    });
  }




  actualizarPaginacion() {
    const inicio = (this.paginaActual - 1) * this.itemsPorPagina;
    const fin = inicio + this.itemsPorPagina;
    this.inventarioFiltrado = this.equiposFiltrados.slice(inicio, fin);
  }

  paginaSiguiente() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
      this.actualizarPaginacion();
    }
  }

  paginaAnterior() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
      this.actualizarPaginacion();
    }
  }

  get totalPaginas(): number {
    return Math.ceil(this.equiposFiltrados.length / this.itemsPorPagina);
  }

  obtenerInventario() {
    this.inventario = [];

    const areasAConsultar = this.isAdmin ? this.areas.filter(a => a !== 'Todos') : this.userArea ? [this.userArea] : [];

    if (areasAConsultar.length === 0) {
      this.equiposFiltrados = [];
      this.actualizarPaginacion();
      return; // Salir sin error si no hay áreas
    }

    const solicitudes = areasAConsultar.map(area =>
      this.firestore.collection(area).get().toPromise().then(snapshot => {
        snapshot.forEach(doc => {
          const data = doc.data() as Equipo;
          this.inventario.push({
            ...data,
            id: doc.id,
            area: area,
            numero: this.inventario.length + 1,
            baja: data.baja
          } as any);
        });
      })
    );

    Promise.all(solicitudes).then(() => {
      this.filtrarEquipos();
    }).catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  }

  async verEquipo(equipo: any) {
    const modal = await this.modalController.create({
      component: VerEquipoComponent,
      componentProps: {
        equipo: equipo
      }
    });

    await modal.present();
  }

  async OpenModalSubir() {
    if (!this.user || !this.user.Rol) {
      console.error('El usuario no está cargado aún.');
      return;
    }

    const userWithArea = {
      ...this.user,
      area: this.userArea  // 👈 Aseguramos que el área se pase correctamente
    };

    const modal = await this.modalController.create({
      component: AgregarEquipoComponent,
      componentProps: {
        user: userWithArea
      },
      mode: 'ios'
    });

    await modal.present();
  }



  async confirmarBaja(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar baja',
      message: '¿Mandar Propuesta de Baja?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, confirmar',
          handler: () => {
            this.marcarComoBaja(item);
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmarBajaJ(item: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar baja',
      message: '¿Mandar Propuesta de Baja?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Sí, confirmar',
          handler: () => {
            this.AsegurarComoBaja(item);
          }
        }
      ]
    });

    await alert.present();
  }

  marcarComoBaja(item: any) {
    if (!item.id || !item.area) {
      console.error('El item no tiene ID o área');
      return;
    }

    this.firestore.collection(item.area).doc(item.id).update({
      baja: null,

    }).then(() => {
      console.log('Solicitud de baja enviada');
      item.baja = null;
    }).catch(err => {
      console.error('Error al marcar como baja', err);
    });
  }

   AsegurarComoBaja(item: any) {
    if (!item.id || !item.area) {
      console.error('El item no tiene ID o área');
      return;
    }

    this.firestore.collection(item.area).doc(item.id).update({
      baja: false,

    }).then(() => {
      console.log('Solicitud de baja enviada');
      item.baja = false;
    }).catch(err => {
      console.error('Error al marcar como baja', err);
    });
  }


  permitirBaja(item: any) {
    if (!item.id || !item.area) {
      console.error('El item no tiene ID o área');
      return;
    }

    this.firestore.collection(item.area).doc(item.id).update({
      baja: true
    }).then(() => {
      console.log('Baja permitida para:', item.descripcion);
      item.baja = true;
    }).catch(err => {
      console.error('Error al permitir la baja', err);
    });
  }

  darDeBaja(item: any) {
    if (!item.area || !item.id) {
      console.error('Falta información del equipo');
      return;
    }

    const equipoConFecha = {
      ...item,
      fecha: firebase.firestore.FieldValue.serverTimestamp()
    };

    this.firestore
      .collection('equiposDeBaja')
      .doc(item.area)
      .collection(item.area)
      .doc(item.id)
      .set(equipoConFecha)
      .then(() => {
        console.log(`Equipo movido a equiposDeBaja/${item.area}/equipos con ID: ${item.id}`);


        this.firestore.collection(item.area).doc(item.id).delete()
          .then(() => {
            console.log('Equipo eliminado del área original');
            this.equiposFiltrados = this.equiposFiltrados.filter(eq => eq.id !== item.id);
          })
          .catch(err => console.error('Error al eliminar equipo original:', err));
      })
      .catch(err => {
        console.error('Error al guardar en equiposDeBaja:', err);
      });
  }

}

