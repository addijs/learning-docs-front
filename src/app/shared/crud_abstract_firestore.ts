import { from, Observable } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

export abstract class Crud<T> {
  protected entityCollection: AngularFirestoreCollection<T>;

  constructor(
    protected COLLECTION_NAME: string,
    protected afs: AngularFirestore
  ) {
    this.entityCollection = this.afs.collection(this.COLLECTION_NAME);
  }

  listar(): Observable<T[]> {
    // usando options para idField para mapear o id gerado pelo firestore para o campo id de usuário
    return this.entityCollection.valueChanges({ idField: 'id' });
  }

  inserir(entity: any): Observable<object> {
    // removendo id pois ele está undefined, já que um novo usuário
    delete entity.id;
    // Object.assign({}, usuario) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado
    // o from transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
    return from(this.entityCollection.add(Object.assign({}, entity)));
  }

  remover(id: string): Observable<void> {
    return from(this.entityCollection.doc(id).delete());
  }

  atualizar(entity: any): Observable<void> {
    // removendo id pois não vamos guardar nos dados do documento, mas sim usar apenas como id para recuperar o documento
    delete entity.id;
    return from(
      this.entityCollection.doc(entity.id).update(Object.assign({}, entity))
    );
  }
}
