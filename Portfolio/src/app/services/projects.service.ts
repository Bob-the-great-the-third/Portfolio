import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Project } from '../models/project';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Langage } from '../models/langage';
import { Competence } from '../models/competence';
import { ProjectImage } from '../models/project-image';

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
    return this.http.delete<Project>(this.projetApi + '/' + projet.id)
  }

  getStarredProjects(): Observable<Project[]>{
    return this.http.get<Project[]>(this.projetApi + "/starred_projects")
  }

  defaults_counters : { [key: number]: number }= { 1:0, 2:1, 3:0, 4:0 }
  static default_path = 'assets/default_pics/'
  static img_paths: { [key: number]: string } = { 
    1:`${ProjectsService.default_path}Perso/`,
    2:`${ProjectsService.default_path}Univ/`,
    3:`${ProjectsService.default_path}Pro/`,
    4:`${ProjectsService.default_path}Problemes/`,
   }

  private getDefaultImageForProject(project: Project): ProjectImage {
    const image: ProjectImage = {
      id:-1,
      project_id:project.id,
      img_path:`${ProjectsService.img_paths[project.id_categorie]}default${this.defaults_counters[project.id_categorie]}.png`
    }

    this.defaults_counters[project.id_categorie]=(this.defaults_counters[project.id_categorie]+1)%2

    return image
  }

  getProjectsImages(projects:Project[]):Observable<ProjectImage[]>{
    const imageRequests = projects.map(project =>
      this.getProjectImages(project.id)
    );

    return forkJoin(imageRequests).pipe(map(imageArrays =>{
      return imageArrays.map((images,idx) => {
        if (images && images.length > 0 && images[0].img_path && images[0].img_path.trim() !== '') {
          return images[0]
        }

        return this.getDefaultImageForProject(projects[idx])
      })
    }))
  }
  
  private getProjectFK<T>(id: number, foreignTable: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.projetApi}/${id}/${foreignTable}`);
  }

  getProjectLanguages(id:number): Observable<Langage[]>{
    return this.getProjectFK<Langage>(id,'langages')
  }
  getProjectCompetences(id:number): Observable<Competence[]>{
    return this.getProjectFK<Competence>(id,'competences')
  }
  getProjectImages(id:number): Observable<ProjectImage[]>{
    return this.getProjectFK<ProjectImage>(id,'images')
  }
}