import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competence } from '../models/competence';

@Injectable({
  providedIn: 'root'
})
export class CompetencesService {
  readonly competencesApi = environment.apiUrl+"/competences"

  constructor(
    private http:HttpClient
  ) { }

    getCompetences():Observable<Competence[]>{
      return this.getCompetencesParams("");
    }
    getCompetencesParams(params:string): Observable<Competence[]>{
      return this.http.get<Competence[]>(this.competencesApi+params);
    }
    searchCompetences(expression:string):Observable<Competence[]>{
      return this.getCompetencesParams("?q="+expression)
    }
    searchCompetencesSorted(field:string,expression:string): Observable<Competence[]> {
      return this.getCompetencesParams("?_sort="+field+"&q="+expression);
    }
    getCompetencesOnProject(idProjet:number) : Observable<Competence[]> {
      return this.http.get<Competence[]>(environment.apiUrl+"/projets/"+idProjet+"/competences");
    }
    getCompetence( id:number ) : Observable<Competence> {
      return this.http.get<Competence>(this.competencesApi+"/"+id)
    }
    addCompetence( nouveauCompetence:Competence ) : Observable<Competence>{
      return this.http.post<Competence>(this.competencesApi, nouveauCompetence)
    }
    updateCompetence(competence: Competence) : Observable<Competence> {
      return this.http.put<Competence>(this.competencesApi+'/'+competence.id, competence)
    }
    deleteCompetence(competence: Competence)  : Observable<Competence> {
      return this.http.delete<Competence>(this.competencesApi+'/'+competence.id)
    }
}
