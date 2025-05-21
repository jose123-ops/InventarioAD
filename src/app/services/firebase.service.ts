import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, User, deleteUser, onAuthStateChanged, reauthenticateWithCredential,EmailAuthProvider } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, updateDoc,deleteDoc, collection  } from 'firebase/firestore';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private currentUser: User | null = null;
  private userRoleSubject = new BehaviorSubject<string>('');
  public userRole$ = this.userRoleSubject.asObservable();

  //private apiUrl = environment.apiBaseUrl;
  private apiUrl = 'http://localhost:3000/api';
  isRoleLoaded: boolean;

  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private http: HttpClient) {

    this.initAuthListener();

    this.auth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  signIn(user: { email: string, password: string }) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  /*signup(user: { email: string, password: string }) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }*/

signup(user: { name: string, email: string, password: string, Rol: string }): Observable<any> {
    const auth = getAuth();
    const db = getFirestore();
    const currentAdminUser = auth.currentUser;

    return new Observable((observer) => {
      if (!currentAdminUser || !currentAdminUser.email) {
        observer.error('No hay un administrador autenticado.');
        return;
      }

      const adminEmail = currentAdminUser.email;

      const adminPassword = prompt('Confirma con la contraseña del administrador:');
      if (!adminPassword) {
        observer.error('Contraseña del administrador no proporcionada.');
        return;
      }

      signInWithEmailAndPassword(auth, adminEmail, adminPassword)
        .then(() => {
          return createUserWithEmailAndPassword(auth, user.email, user.password);
        })
        .then(async (userCredential) => {
          const newUser = userCredential.user;

          // Guardar datos adicionales en Firestore
          await setDoc(doc(db, 'users', newUser.uid), {
            Rol: user.Rol,
            email: user.email,
            name: user.name,
            password: user.password,
            Uid: newUser.uid,
           
          });

          // Cerrar sesión del usuario creado (ya que Firebase lo loguea automáticamente)
          await auth.signOut();

          // Volver a loguear al admin
          await signInWithEmailAndPassword(auth, adminEmail, adminPassword);

          observer.next({ message: 'Usuario creado exitosamente', uid: newUser.uid });
          observer.complete();
        })
        .catch((error) => {
          console.error('Error en el proceso de registro:', error);
          observer.error(error.message);
        });
    });
  }
    
  getUserById(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data)
  }

  
  deletedDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path))
  }

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return ((await getDoc(doc(getFirestore(), path))).data());

  }

  getUserAuth(): Observable<any> {
    return this.auth.authState;
  }

  // Ontener usuario
  getUsers(): Observable<any[]> {
    return this.firestore.collection('users').valueChanges();
  }
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Método para cerrar sesión
  logout() {
    return this.auth.signOut();
  }

  public initAuthListener() {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user && user.email !== 'admin@kouture.com') { // ⛔ Evita sobreescribir el rol del admin
        this.currentUser = user;
        await this.loadUserRole(user.uid);
      } else {
        this.currentUser = null;
        this.isRoleLoaded = false;
        this.userRoleSubject.next(null);
      }
    });
  }
  

  async loadUserRole(uid: string) {
    const userDocRef = this.firestore.doc(`users/${uid}`).ref;
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data() as { Rol?: string };
      this.isRoleLoaded = true;
      this.userRoleSubject.next(userData?.Rol || null);
    } else {
      this.isRoleLoaded = true;
      this.userRoleSubject.next(null);
    }
  }

  getUserRole(): string {
    return this.userRoleSubject.value;
  }


  getRegistros(): Observable<any[]> {
    const registrosRef = this.firestore.collection('users').valueChanges();
    return registrosRef;
  }


  getUserByEmail(email: string): Promise<any> {
  return new Promise((resolve, reject) => {
    this.firestore.collection('users', ref => ref.where('email', '==', email))
      .get()
      .subscribe({
        next: (querySnapshot) => {
          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); // Tomamos el primer resultado
            resolve(userData);
          } else {
            resolve(null);
          }
        },
        error: (err) => {
          console.error("❌ Error al obtener usuario por email:", err);
          reject(err);
        }
      });
  });
}

}


  /*getUser(): Observable<any[]> {
    const usersCollection = this.firestore.collection('users').ref;
  
    return collectionData(usersCollection, { idField: 'id' }).pipe(
      map(users => users.map(user => ({
        ...user,
        id: user.id || user.uid // 📌 Si `id` no existe, usa `uid`
      })))
    );
  }*/

  // Método para verificar si el usuario está autenticado
 



