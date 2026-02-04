import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categorie } from '../models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  readonly categoriesApi = environment.apiUrl + "/categories"

  constructor(
    private http: HttpClient,
  ) { }

  getAllCategs() : Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.categoriesApi);
  }

  getCateg(id:number) : Observable<Categorie>{
    return this.http.get<Categorie>(this.categoriesApi+"/"+id)
  }
}
