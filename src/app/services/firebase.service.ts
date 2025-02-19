import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, User, deleteUser } from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, updateDoc,deleteDoc  } from 'firebase/firestore';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private currentUser: User | null = null;

  //private apiUrl = environment.apiBaseUrl;
  private apiUrl = 'http://localhost:3000/api';

  constructor(private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private http: HttpClient) {

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
      console.log('Enviando solicitud al backend...', user);  // Verifica los datos enviados al backend
      const auth = getAuth();
      
      return new Observable((observer) => {
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            const uid = userCredential.user.uid;
            console.log('UID del usuario:', uid); // Verifica si el UID está correcto
            // Llamada al backend con el UID
            this.http.post<any>(`${this.apiUrl}/signup`, {
              uid: uid,
              name: user.name,
              email: user.email,
              Rol: user.Rol
            }).subscribe({
              next: (res) => {
                console.log('Respuesta del backend:', res);  // Verifica la respuesta
                observer.next(res);
              },
              error: (err) => {
                observer.error(err);
              },
              complete: () => {
                observer.complete();
              }
            });
          })
          .catch((error) => {
            console.error('Error en la creación del usuario:', error);
            observer.error(error);
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
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  // Método para cerrar sesión
  logout() {
    return this.auth.signOut();
  }
}

