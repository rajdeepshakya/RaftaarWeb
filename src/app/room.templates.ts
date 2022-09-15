import { Messagex } from "./message.templates";

export class Roomx {
  constructor(
    public roomId: string, 
    public messages: Messagex[] = []
  ) {}
}
