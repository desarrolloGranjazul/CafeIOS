export class ResponseApi{
  static getInstance(obj:any){
    //  console.log('ResponseAPI >>',JSON.stringify(obj));
      let objResp = JSON.parse(JSON.stringify(obj));
      return new ResponseApi(
          objResp['ok'],
          objResp['data'],
          objResp['error']
      )
  };
  constructor(public ok: boolean, public data:any[], public error:string){}
}
