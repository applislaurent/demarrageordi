import {Component, Input, ViewEncapsulation, OnInit} from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormBuilder, FormArray, Validators }    from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LogicielDto } from '../../entities/logiciel-dto';
import { SitewebDto } from '../../entities/siteweb-dto';
import { LogicielsEtSitesDto } from '../../entities/logiciels-et-sites-dto';
import { FormulaireCreationDto } from '../../entities/formulaire-creation-dto';
import { BatchService } from '../../services/batch.service';
import { saveAs } from 'file-saver/src/FileSaver';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.css']
})
export class BatchComponent implements OnInit {

  // Variable de stockage du fichier batch
  fichierBatch: Blob;

  // Variables pour la création de batch à partir du formulaire
  formulaireCreationBatch : FormGroup;
	messageConfirmationCreationBatchOK: string;
  messageConfirmationCreationOK: string;
  formulaireTelechargementBatch: FormGroup;
	messageConfirmationTelechargementBatchOK: string;

  // Variable pour afficher les messages d'erreur
  messageErreur: string;

  // Constructeur
  constructor(private batchService: BatchService,  private domSanitizer: DomSanitizer, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    // Initialisation du formulaire pour créer le batch
    this.creerFormulaireCreationBatch();

    // Initialisation du formulaire pour récupérer le batch
    this.creerFormulaireTelechargementBatch();

  }

  creerFormulaireCreationBatch() {

    // Variable de patteren de validation d'url de site web + getter
    const patternUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.formulaireCreationBatch = this.formBuilder.group({
      'idLogiciel1': [''],
		  'nomLogiciel1': [''],
      'repertoireLogiciel1': [''],
      'idLogiciel2': [''],
		  'nomLogiciel2': [''],
      'repertoireLogiciel2': [''],
      'idLogiciel3': [''],
		  'nomLogiciel3': [''],
      'repertoireLogiciel3': [''],
      'idLogiciel4': [''],
		  'nomLogiciel4': [''],
      'repertoireLogiciel4': [''],
      'idLogiciel5': [''],
		  'nomLogiciel5': [''],
      'repertoireLogiciel5': [''],
      'idSiteweb1': [''],
		  'urlSiteweb1': ['', Validators.pattern(patternUrl)],
      'idSiteweb2': [''],
		  'urlSiteweb2': ['', Validators.pattern(patternUrl)],
      'idSiteweb3': [''],
		  'urlSiteweb3': ['', Validators.pattern(patternUrl)],
      'idSiteweb4': [''],
		  'urlSiteweb4': ['', Validators.pattern(patternUrl)],
      'idSiteweb5': [''],
		  'urlSiteweb5': ['', Validators.pattern(patternUrl)]
		});
  }

  creerFormulaireTelechargementBatch() {

      this.formulaireTelechargementBatch = this.formBuilder.group({
      'id': ['', Validators.required],
		  'nom': ['', Validators.required],
      'repertoire': ['', Validators.required]
		});

  }

  /* Méthode qui renvoie les controls du formlaire de création de batch:
	- permet d'accéder aux éléments du formulaire simplement (ex: f.urlSitWeb1)
	- appelée dans le code html pour accéder aux urls de sites web (et pour les valider ensuite)*/
  get f(){
    return this.formulaireCreationBatch.controls;
  }

  /* Méthode de création de batch:
	- appelée lors du clic sur le bouton 'Créer le fichier'
	- appelle LogicielService.creerLogiciel(), en lui passant en paramètre les infos du formulaire de saisie */
	/*creerBatch(): void {

    this.batchService
            .creerBatch(this.tologicielsEtSitesDto(this.formulaireCreationBatch.value))
            .subscribe(blob => {
                                 saveAs(blob, 'Demarrage_sites_et_logiciels.bat');
                               },
                       erreur => {this.messageErreur = erreur.error}
            );
    this.messageConfirmationCreationOK = "Le batch a bien été créé, merci !";

  }
  */

   /* Méthode de création de batch:
	- appelée lors du clic sur le bouton 'Créer le fichier'
	- appelle LogicielService.creerLogiciel(), en lui passant en paramètre les infos du formulaire de saisie */
	creerBatch(): void {

    this.batchService
            .creerBatch(this.tologicielsEtSitesDto(this.formulaireCreationBatch.value))
            .subscribe(blob => {
                                 if(blob instanceof Blob && blob.type==='application/octet-stream') {
                                    saveAs(blob, 'Demarrage_sites_et_logiciels.bat');
                                    this.messageConfirmationCreationOK = "Le fichier a bien été créé, merci !";
                                    this.messageErreur = "";
                                 }
                                 else {
                                    var textPromise = blob.text();
                                    blob.text().then(text => this.messageErreur = text);
                                    this.messageConfirmationCreationOK = "";
                                    console.log(this.messageErreur);
                                 };
                                 
            });

  }

  /* Méthode de conversion de FormulaireCreationDto (données récupérées du formulaire)
     en LogicielsEtSitesDto (format à envoyer à l'API 'creer.batch')
	- appelée lors du clic sur le bouton 'Créer le fichier'
	- appelle LogicielService.creerLogiciel(), en lui passant en paramètre les infos du formulaire de saisie */

  tologicielsEtSitesDto(formulaireCreationDto: FormulaireCreationDto): LogicielsEtSitesDto {
    
    var logicielDtos: LogicielDto[] = new Array();
    var sitewebDtos: SitewebDto[] = new Array();
    var logicielsEtSitesDto = new LogicielsEtSitesDto();

    if(formulaireCreationDto.nomLogiciel1 !="") {
      var logicielDto1: LogicielDto = new LogicielDto();
      logicielDto1.setValues(1, formulaireCreationDto.nomLogiciel1, formulaireCreationDto.nomLogiciel1);
      logicielDtos.push(logicielDto1);
    }

    if(formulaireCreationDto.nomLogiciel2 !="") {
      var logicielDto2: LogicielDto = new LogicielDto();
      logicielDto2.setValues(1, formulaireCreationDto.nomLogiciel2, formulaireCreationDto.nomLogiciel2);
      logicielDtos.push(logicielDto2);
    }

    if(formulaireCreationDto.nomLogiciel3 !="") {
      var logicielDto3: LogicielDto = new LogicielDto();
      logicielDto3.setValues(1, formulaireCreationDto.nomLogiciel3, formulaireCreationDto.nomLogiciel3);
      logicielDtos.push(logicielDto3);
    }

    if(formulaireCreationDto.nomLogiciel4 !="") {
      var logicielDto4: LogicielDto = new LogicielDto();
      logicielDto4.setValues(1, formulaireCreationDto.nomLogiciel4, formulaireCreationDto.nomLogiciel4);
      logicielDtos.push(logicielDto4);
    }

    if(formulaireCreationDto.nomLogiciel5 !="") {
      var logicielDto5: LogicielDto = new LogicielDto();
      logicielDto5.setValues(1, formulaireCreationDto.nomLogiciel5, formulaireCreationDto.nomLogiciel5);
      logicielDtos.push(logicielDto5);
    }

    logicielsEtSitesDto.logicielDtos = logicielDtos;

    if(formulaireCreationDto.urlSiteweb1 !="") {
      var sitewebDto1: SitewebDto = new SitewebDto();
      sitewebDto1.setValues(1, formulaireCreationDto.urlSiteweb1);
      sitewebDtos.push(sitewebDto1);
    }

    if(formulaireCreationDto.urlSiteweb2 !="") {
      var sitewebDto2: SitewebDto = new SitewebDto();
      sitewebDto2.setValues(1, formulaireCreationDto.urlSiteweb2);
      sitewebDtos.push(sitewebDto2);
    }

    if(formulaireCreationDto.urlSiteweb3 !="") {
      var sitewebDto3: SitewebDto = new SitewebDto();
      sitewebDto3.setValues(1, formulaireCreationDto.urlSiteweb3);
      sitewebDtos.push(sitewebDto3);
    }

    if(formulaireCreationDto.urlSiteweb4 !="") {
      var sitewebDto4: SitewebDto = new SitewebDto();
      sitewebDto4.setValues(1, formulaireCreationDto.urlSiteweb4);
      sitewebDtos.push(sitewebDto4);
    }

    if(formulaireCreationDto.urlSiteweb5!="") {
      var sitewebDto5: SitewebDto = new SitewebDto();
      sitewebDto5.setValues(1, formulaireCreationDto.urlSiteweb5);
      sitewebDtos.push(sitewebDto5);
    }

    logicielsEtSitesDto.sitewebDtos = sitewebDtos;

    formulaireCreationDto = new FormulaireCreationDto();

    return logicielsEtSitesDto;

  }

  telechargerBatch(): void {

    this.batchService
            .telechargerBatch()
            .subscribe(blob => {
              saveAs(blob, 'Demarrage_sites_et_logiciels.bat');
            });
    this.messageConfirmationCreationOK = "Le batch a bien été enregistré, merci !";
  }

}
