export class Persona{
  static instance(obj:any){
      return new this(
        obj['idpersona'],
        obj['dpi'],
        obj['nombre'],
        obj['tipo'],
        obj['rol'],
        obj['rol_solicitado'],
        obj['usuario'],
        obj['password'],
        obj['correo'],
        obj['codigo_password'],
        obj['fecha_codigo_password'],
        obj['saldo'],
        obj['codigo_sap'],
        obj['departamento']
      );
  }
  private constructor(
    public idpersona :string,
    public dpi :string,
    public nombre :string,
    public tipo :string,
    public rol :string,
    public rol_solicitado :string,
    public usuario :string,
    public password :string,
    public correo :string,
    public codigo_password :string,
    public fecha_codigo_password :string,
    public saldo :string,
    public codigo_sap :string,
    public departamento :string
  ){}
}
