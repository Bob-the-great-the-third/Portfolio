import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Status } from '../models/status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsStatusService {
  readonly statusApi = environment.apiUrl + "/statuts_possibles"

  constructor(
    private http: HttpClient,
  ) { }

  getAllStatus() : Observable<Status[]>{
    return this.http.get<Status[]>(this.statusApi);
  }

  getStatus(id:number): Observable<Status>{
    return this.http.get<Status>(this.statusApi+"/"+id)
  }
}
