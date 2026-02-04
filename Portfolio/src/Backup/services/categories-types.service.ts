import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategorieType } from '../models/categorie-type';

@Injectable({
  providedIn: 'root'
})
export class CategoriesPossiblesService {
  readonly typePlatsApi = environment.apiUrl + "/categories_possibles"

  constructor(
    private http: HttpClient,
  ) { }

  getTypesPlats() : Observable<CategorieType[]>{
    return this.http.get<CategorieType[]>(this.typePlatsApi);
  }
}
