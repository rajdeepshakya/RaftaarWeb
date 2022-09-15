export class Messagex {
    constructor(
      public userId: string,
      public text: string,
      public messageDate = Date.now()
    ) {}
  }
    