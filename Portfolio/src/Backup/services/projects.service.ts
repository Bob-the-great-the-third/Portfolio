import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  readonly projetApi = environment.apiUrl + "/projets"

  constructor(
    private http: HttpClient,
  ) { }

  getProjects(): Observable<Project[]> {
    return this.getProjectsParameters("");
  }

  private getProjectsParameters(params:string):Observable<Project[]>{
    return this.http.get<Project[]>(this.projetApi+params)
  }
  
  getProjectsSorted(field:string):Observable<Project[]>{
    return this.getProjectsParameters("?_sort="+field)
  }
  searchProjects(expression:string):Observable<Project[]>{
    return this.getProjectsParameters("?q="+expression)
  }
  searchProjectsSorted(expression:string,field:string){
    return this.getProjectsParameters("?q="+expression+"&_sort="+field)
  }

  addProject(newProject: Project): Observable<Project> {
    const now = new Date();
    const year = now.getFullYear();
    newProject.dates=year.toString();
    return this.http.post<Project>(this.projetApi, newProject)
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.projetApi + "/" + id)
  }
  updateProject(projet: Project): Observable<Project> {
    return this.http.put<Project>(this.projetApi + '/' + projet.id, projet)
  }

  deleteProject(projet: Project): Observable<Project> {

    // this.emptyProject(projet.id);

    return this.http.delete<Project>(this.projetApi + '/' + projet.id)
  }

  // emptyProject(idMenu: number): void {
    // this.platService.getPlatsOnMenu(idMenu).subscribe({
      // next: plats => {
        // plats.forEach((plat) => this.platService.deletePlat(plat))
      // }
    // });
  // }
// 
  // getMenuCaloriesAmount(idMenu: number): Observable<number> {
    // return this.platService.getPlatsOnMenu(idMenu).pipe(
      // map(plats => plats.reduce((total, plat) => total + plat.calories, 0))
    // );
  // }
}