import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, User, deleteUser, onAuthStateChanged } from 'firebase/auth';
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
      return new Observable((observer) => {
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            const uid = userCredential.user.uid;
         
            this.http.post<any>(`${this.apiUrl}/signup`, {
              id: uid,
              name: user.name,
              email: user.email,
              password: user.password,
              Rol: user.Rol
            }).subscribe({
              next: (res) => {
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
      if (user) {
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
 



