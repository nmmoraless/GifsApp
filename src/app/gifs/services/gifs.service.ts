import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey: string = 'CtbSNZMFPFlbWl1x5KQjtqPOHnE1ema5';
  private _historial: Array<string> = [];
  /* Cambiar Any por el tipado correcto  */
  public resultados: Array<Gif> = [];
  
  get historial(){ 
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];//Forma 1 de llamar el localStorage

    if(localStorage.getItem('historial')) {
      this._historial = JSON.parse( localStorage.getItem('historial')!);
    }//Forma 2 de llamar el localStorage
    
  }

  buscarGifs(query: string) {

    query = query.trim().toLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=CtbSNZMFPFlbWl1x5KQjtqPOHnE1ema5&q=${query}&limit=10`).subscribe( ( resp: any ) => {
      console.log( resp.data );
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    })

  }

}
