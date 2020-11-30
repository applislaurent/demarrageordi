export class LogicielDto {

    id: number;
    nom: string;
    repertoire: string;

    setValues(id: number, nom: string, repertoire: string) : void {

      this.id = id;
      this.nom = nom;
      this.repertoire = repertoire;

    }
}
