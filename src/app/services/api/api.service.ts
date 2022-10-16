import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Projects } from 'app/models/projects';
import { Injectable } from '@angular/core';
import { Edital } from 'app/models/edital';
import { File } from 'app/models/file';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  printName: any;

  constructor(
    private firestore: AngularFirestore
  ){    
  }

  listEditals() {
    let superQuery = this.firestore.collection<Edital[]>('Editals').valueChanges();
    return superQuery;
  }

  getEditals(editID) {
    return this.firestore.doc('Editals/' + editID).valueChanges();
  }

  addEditals(dataEditals) {
    return this.firestore.collection('Editals').doc(dataEditals.uid).set({
      uid: dataEditals.uid,
      title: dataEditals.title,
      descr: dataEditals.descr,
      obs: dataEditals.obs,
      requirements: dataEditals.requirements,
      calendarfirst: dataEditals.calendarfirst,
      calendarend: dataEditals.calendarend,
      link: dataEditals.link,
      vagas: dataEditals.vagas,
      valor: dataEditals.valor,
      createdAt: Date.now(),
      updatedAt: Date.now()
    }).catch(e => {
      console.log('Erro Api: ', e);
    });
  }

  updateEditals(iD, dataEditals) {
    return this.firestore.doc('Editals/' + iD).update(dataEditals);
  }

  deleteEditals(editID) {
    return this.firestore.doc('Editals/' + editID).delete();
  }

  getProjects(userID) {
    let superQuery = this.firestore.collection<Projects>('Projects').doc(userID).valueChanges();
    return superQuery;
  }

  subscribeProjects(userUID: string, dataProj: Projects): Promise<void> {
    console.log('SubscribeProj: ', userUID, dataProj);
    try {
      return this.firestore.collection('Projects').doc(userUID).set({
        createdAt: dataProj.createdAt || Date.now(),
        projects: dataProj.projects,
        updatedAt: Date.now(),
      }, { merge: true });
    } catch (e) {
      console.log('Erro ao salvar: ', e);
    }
  }

  updateProjects(userUID: string, dataProj: Projects): Promise<void> {
    console.log('Api SubscribeProj: ', userUID, dataProj);
    try {
      return this.firestore.collection('Projects').doc(userUID).set({
        createdAt: dataProj.createdAt,
        projects: dataProj.projects,
        updatedAt: Date.now(),
      }, { merge: true });
    } catch (e) {
      console.log('Erro ao salvar: ', e);
    }
  }

  listFiles(userUID) {
    return this.firestore.doc('Files/' + userUID).valueChanges();
  }

  async saveUdpadeFiles(dataFiles: File) {
    try {
      return await this.firestore.collection<File>('Files').doc(dataFiles.uid).set({
        uid: dataFiles.uid,
        createdAt: dataFiles.createdAt || Date.now(),
        identity: dataFiles.identity,
        cpf: dataFiles.cpf,
        proof: dataFiles.proof,
        history: dataFiles.history,
        letter: dataFiles.letter,
        updatedAt: Date.now(),
      }, { merge: true });
    } catch (e) {
      console.log('Erro ao salvar: ', e);
    }
  }

  getPrintName(){
    return this.printName;
  }

  setPrintName(pdfName){
    this.printName = pdfName;
  }

  updateDataUser(iD, dataUser){
    return this.firestore.doc('Users/' + iD).update(dataUser);
  }
}
