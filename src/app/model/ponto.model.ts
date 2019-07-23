export enum Actions {
  "Started",
  "Paused",
  "Stopped"
}

export interface Ponto {
  entrada: Date;
  saida: Date;
  inicioAlmoco?: Date;
  voltaAlmoco?: Date;
}
