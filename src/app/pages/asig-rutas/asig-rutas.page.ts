import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-asig-rutas',
  templateUrl: './asig-rutas.page.html',
  styleUrls: ['./asig-rutas.page.scss'],
})
export class AsigRutasPage implements OnInit {

  conductores: any[] = [];
  rutasAsignadas: any[] = []; // Lista de rutas asignada


  rutaForm = new FormGroup({
    conductor: new FormControl('', [Validators.required]),
    cliente: new FormControl('', [Validators.required]),
    fechaEnvio: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    instrucciones: new FormControl(''),
  });

  constructor(private fb: FormBuilder,
    private firebaseService: FirebaseService) { }

  ngOnInit() {
    // Inicializar el formulario
    this.rutaForm = this.fb.group({
      conductor: ['', Validators.required],
      cliente: ['', Validators.required],
      fechaEnvio: ['', Validators.required],
      direccion: ['', Validators.required],
      instrucciones: ['']
    });

    // Cargar conductores (usuarios con rol "conductor")
    this.firebaseService.getConductores().subscribe(conductores => {
      this.conductores = conductores;
    });
  }

  asignarRuta() {
    if (this.rutaForm.valid) {
      console.log('Datos de la ruta:', this.rutaForm.value);
      // Aquí puedes enviar los datos a Firebase o a tu backend
    }
  }

  // Obtener el nombre del conductor según el id
  getConductorName(conductorId: string): string {
  const conductor = this.conductores.find(c => c.id === conductorId);
  return conductor ? conductor.name : 'Desconocido';
}

getRutasAsignadas() {
  this.firebaseService.getRutasAsignadas().subscribe(rutas => { 
    this.rutasAsignadas = rutas.map(ruta => {
      return {
        ...ruta,
        conductorName: this.getConductorName(ruta.conductorId),
        estado: ruta.estado || 'Pendiente',
      };
    });
  });
}
}








