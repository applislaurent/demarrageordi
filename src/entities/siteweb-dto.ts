export class SitewebDto {
    id: number;
    url: string;

    setValues(id: number, url: string) : void {

      this.id = id;
      this.url = url;

    }
}
