import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { LogicielDto } from '../entities/logiciel-dto';
import { SitewebDto } from '../entities/siteweb-dto';
import { LogicielsEtSitesDto } from '../entities/logiciels-et-sites-dto';
import { saveAs } from 'file-saver/src/FileSaver';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/octet-stream' })
};

@Injectable({ providedIn: 'root' })
export class BatchService {

  // Urls d'accès aux service

  // Accès à l'application 'demarrageordi'
  // Accès local
  private urlDemarrageOrdi = 'http://localhost:8080/demarrageordi';
  // Accès distant
  // private urlDemarrageOrdi = 'https://demarrageordi.osc-fr1.scalingo.io';

  // Complément d'URL pour accès au service de création de batch'
  private urlCreerBatch = '/creer.batch';
  private urlTelechargerBatch = '/telecharger.batch';

  // Variable pour afficher les messages d'erreur
  messageErreur: string;
  getMessageErreur(): string {
    return this.messageErreur;
  }

  // Constructeur
  constructor(
    private http: HttpClient
  ) { } 

  /** Créer le batch */
  creerBatch (logicielsEtSitesDto: LogicielsEtSitesDto): Observable<Blob> {

	  return this.http.post(this.urlDemarrageOrdi + this.urlCreerBatch, logicielsEtSitesDto,
                        {responseType: "blob", headers: {'Accept': 'application/octet-stream'}});

  }


  /** Télécharger le batch */
  telechargerBatch(): Observable<Blob> {
    return this.http.get(this.urlDemarrageOrdi + this.urlTelechargerBatch,
                        {responseType: "blob", headers: {'Accept': 'application/octet-stream'}});
  }

  // TODO: reprendre creerBatch. crée bien le batch.
  // --> Voir comment récupérer le fichier et l'enregistrer
  // --> Voir html: mettre toutes infos sur un seul formulaire? Autre chose ?
  // --> Gérer les erreurs

}
