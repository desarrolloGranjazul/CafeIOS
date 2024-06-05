export class Localidad{
    static instance(obj:any){
        return new this(
          obj['idlocalidad'],
          obj['localidad'],
          obj['control_monetario'],
          obj['penalizar_ofertas'],
          obj['idpersonainserta']
        );
    }
    private constructor(
        public idlocalidad: number,
        public localidad: string,
        public control_monetario: string,
        public penalizar_ofertas: string,
        public idpersonainserta: string
    ){}
  }