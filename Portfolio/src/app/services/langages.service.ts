import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Langage } from '../models/langage';

@Injectable({
  providedIn: 'root'
})
export class LangagesService {
  readonly langagesApi = environment.apiUrl+"/langages"

  constructor(
    private http:HttpClient
  ) { }

  getLangages():Observable<Langage[]>{
    return this.getLangagesParams("");
  }
  getLangagesParams(params:string): Observable<Langage[]>{
    return this.http.get<Langage[]>(this.langagesApi+params);
  }
  searchLangages(expression:string):Observable<Langage[]>{
    return this.getLangagesParams("?q="+expression)
  }
  searchLangagesSorted(field:string,expression:string): Observable<Langage[]> {
    return this.getLangagesParams("?_sort="+field+"&q="+expression);
  }
  getLangagesOnProject(idProjet:number) : Observable<Langage[]> {
    return this.http.get<Langage[]>(environment.apiUrl+"/projets/"+idProjet+"/langages");
  }
  getLangage( id:number ) : Observable<Langage> {
    return this.http.get<Langage>(this.langagesApi+"/"+id)
  }
  addLangage( nouveauLangage:Langage ) : Observable<Langage>{
    return this.http.post<Langage>(this.langagesApi, nouveauLangage)
  }
  updateLangage(langage: Langage) : Observable<Langage> {
    return this.http.put<Langage>(this.langagesApi+'/'+langage.id, langage)
  }
  deleteLangage(langage: Langage)  : Observable<Langage> {
    return this.http.delete<Langage>(this.langagesApi+'/'+langage.id)
  }
}