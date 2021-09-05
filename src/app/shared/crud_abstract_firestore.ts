import { from, Observable } from 'rxjs';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    DocumentReference
} from '@angular/fire/firestore';


export abstract class CrudFirestore<T> {
    protected entityCollection: AngularFirestoreCollection<T>;
    protected collectionName: string;

    protected constructor(
        collectionName: string,
        protected db: AngularFirestore
    ) {
        this.collectionName = collectionName;
        this.entityCollection = db.collection<T>(collectionName);
    }

    listar(): Observable<T[]> {
        // Usando options para idField para mapear o id gerado pelo firestore para o campo id
        return this.entityCollection.valueChanges({ idField: 'id' });
    }

    inserir(entity: any): Observable<DocumentReference<T>> {
        // Removendo id pois ele está undefined, já que é um novo objeto
        delete entity.id;
        // Object.assign({}, entity) é usado para passar um objeto json puro. Não se aceita passar um objeto customizado.
        // O from() transforma uma promise num Observable, para mantermos a assinatura similar ao do outro service
        return from(this.entityCollection.add(Object.assign({}, entity)));
    }

    remover(id: string): Observable<void> {
        return from(this.entityCollection.doc(id).delete());
    }

    atualizar(entityId: any, data: Partial<T>): Observable<void> {
        return from(
            this.entityCollection.doc(entityId)
                .update(data)
        );
    }
}