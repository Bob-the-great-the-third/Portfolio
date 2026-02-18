import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProjectsService } from '../../services/projects.service';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,          // <——— REQUIRED for imports[] to work
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.css'],
  imports: [
    CommonModule
  ]
})
export class ProjectDetail implements OnInit {

  project: any = null;
  categorie: string = '';
  langages: any[] = [];
  competences: any[] = [];
  images: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectsService: ProjectsService,
    private categoriesService: CategoriesService,
    private cdr: ChangeDetectorRef          // <— helps force refresh if needed
  ) {}

  ngOnInit(): void {
    const projectId = +this.route.snapshot.params['id'];
    this.loadProjectData(projectId);
  }

  loadProjectData(projectId: number): void {

    // Load main project
    this.projectsService.getProject(projectId).subscribe(project => {
      console.log("Project loaded:", project);
      this.project = project;
      this.cdr.detectChanges();

      if (project?.id_categorie) {
        this.categoriesService.getCateg(project.id_categorie)
          .subscribe(category => {
            console.log("Category loaded:", category);
            this.categorie = category.full_name;
            this.cdr.detectChanges();
          });
      }
    });

    // Load relations
    this.projectsService.getProjectLanguages(projectId).subscribe(data => {
      console.log("Langages loaded:", data);
      this.langages = data;
      this.cdr.detectChanges();
    });

    this.projectsService.getProjectCompetences(projectId).subscribe(data => {
      console.log("Competences loaded:", data);
      this.competences = data;
      this.cdr.detectChanges();
    });

    this.projectsService.getProjectImages(projectId).subscribe(data => {
      console.log("Images loaded:", data);
      this.images = data;
      this.cdr.detectChanges();
    });
  }
}