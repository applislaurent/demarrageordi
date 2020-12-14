import {Component, Input, ViewEncapsulation, OnInit} from '@angular/core';
import { FormsModule, FormControl, FormGroup, FormBuilder, FormArray, Validators, AbstractControl }    from '@angular/forms';
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
  
  // Variable de patteren de validation d'url de site web + getter
  patternUrl: string = "(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?";

  // Variables pour la création de batch à partir du formulaire
  formulaireCreationBatch : FormGroup;
	messageConfirmationCreationBatchOK: string;
  messageConfirmationCreationOK: string;
  formulaireTelechargementBatch: FormGroup;
	messageConfirmationTelechargementBatchOK: string;

  // Variable pour afficher les messages d'erreur
  messageErreur: string;

  // Constructeur
  constructor(private batchService: BatchService,  private domSanitizer: DomSanitizer, private formBuilder: FormBuilder) {
	  
	  this.formulaireCreationBatch = this.formBuilder.group({
		
		  logiciels: this.formBuilder.array([
			this.formBuilder.control(null)
		  ]),
		  urlSitewebs: this.formBuilder.array([
			this.formBuilder.control(null, Validators.pattern(this.patternUrl))
		  ])	  
	});
	
  }

  ngOnInit(): void {

    // Initialisation du formulaire pour créer le batch
    this.creerFormulaireCreationBatch();

  }

  creerFormulaireCreationBatch() {

    // Variable de patteren de validation d'url de site web + getter
    //const patternUrl = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';


  }
  
  ajouterLogiciel(): void {
    (this.formulaireCreationBatch.get("logiciels") as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  supprimerLogiciel(index) {
    (this.formulaireCreationBatch.get("logiciels") as FormArray).removeAt(index);
  }
  
  getLogicielsFormControls(): AbstractControl[] {
    return (<FormArray> this.formulaireCreationBatch.get("logiciels")).controls;
  }
  
  ajouterUrlSiteweb(): void {
    (this.formulaireCreationBatch.get("urlSitewebs") as FormArray).push(
      this.formBuilder.control(null, Validators.pattern(this.patternUrl))
    );
  }

  supprimerUrlSiteweb(index) {
    (this.formulaireCreationBatch.get("urlSitewebs") as FormArray).removeAt(index);
  }
  
  getUrlSitewebsFormControls(): AbstractControl[] {
    return (<FormArray> this.formulaireCreationBatch.get("urlSitewebs")).controls;
  }
  
  getUrlSitewebFormControl(): AbstractControl[] {
	console.log(this.formulaireCreationBatch.get("urlSiteweb").value);
    return (<FormArray> this.formulaireCreationBatch.get("urlSiteweb")).value;
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
	creerBatch(): void {

    this.batchService
            .creerBatch(this.tologicielsEtSitesDto(this.formulaireCreationBatch.value))
            .subscribe(blob => {
                                 if(blob instanceof Blob && blob.type==='application/octet-stream') {
                                    saveAs(blob, 'Demarrage_sites_et_logiciels.bat');
                                    this.messageConfirmationCreationOK = "Le fichier a bien été créé, quand vous le lancerez vous devrez sans doute donner l'autorisation à votre antivirus de le faire";
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

	// Ajout des logiciels
	
	var logiciels: string = this.formulaireCreationBatch.value.logiciels ;	

	for (var logiciel of logiciels) {
      console.log(logiciel);
      var logicielDto: LogicielDto = new LogicielDto(); 
      logicielDto.setValues(1, logiciel, logiciel)	;
      logicielDtos.push(logicielDto);			
	}

	logicielsEtSitesDto.logicielDtos = logicielDtos;
	
	console.log(logicielDtos);
	
	// Ajout des sites webs
	
	var urlSitewebs: string = this.formulaireCreationBatch.value.urlSitewebs ;	

	for (var urlSiteweb of urlSitewebs) {
      console.log(urlSiteweb);
      var sitewebDto: SitewebDto = new SitewebDto(); 
      sitewebDto.setValues(1, urlSiteweb)	;
      sitewebDtos.push(sitewebDto);			
	}
    logicielsEtSitesDto.sitewebDtos = sitewebDtos;
	
	console.log(sitewebDtos);


   console.log(logicielsEtSitesDto);

    return logicielsEtSitesDto;

  }
 

 }
