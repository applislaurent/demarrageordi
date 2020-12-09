import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: [ './carousel.component.css' ]
})
export class CarouselComponent  {
  name = 'Angular';
  imageObject = [{
      image: 'assets/images/aide1bis.png',
      thumbImage: 'assets/images/aide1bis.png',
      title: '1. clic dans la barre de recherches'
  }, {
      image: 'assets/images/aide2bis.png',
      thumbImage: 'assets/images/aide2bis.png',
      title: '2. saisie du nom du logiciel'
  }, {
      image: 'assets/images/aide3bis.png',
      thumbImage: 'assets/images/aide3bis.png',
      title: '3. clic droit sur le logiciel, clic gauche sur "Ouvrir l\'emplacement du fichier"'
  },{
      image: 'assets/images/aide4bis.png',
      thumbImage: 'assets/images/aide4bis.png',
      title: '4. clic droit sur le logiciel, clic gauche sur "Propriétés"'
  }, {
      image: 'assets/images/aide5bis.png',
      thumbImage: 'assets/images/aide5bis.png',
      title: '5. copier la valeur contenu dans le champ "cible"'
  }, {
      image: 'assets/images/aide6bis.png',
      thumbImage: 'assets/images/aide6bis.png',
      title: '6. fermer la fenêtre "Propriétés"'
  }, {
      image: 'assets/images/aide7bis.png',
      thumbImage: 'assets/images/aide7bis.png',
      title: '7. cliquer dans le champ où on souhaite coller le chemin du logiciel'
  }, {
      image: 'assets/images/aide8bis.png',
      thumbImage: 'assets/images/aide8bis.png',
      title: '8. clic droit, clic gauche sur "Coller"'
  }];
}
