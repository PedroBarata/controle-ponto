export enum Status {
  "Started",
  "Paused",
  "Returned",
  "Stopped"
}

export interface Ponto {
  id: string,
  userId: string,
  entrada?: string;
  saida?: string;
  status: Status;
  inicioAlmoco?: string;
  voltaAlmoco?: string;
}
