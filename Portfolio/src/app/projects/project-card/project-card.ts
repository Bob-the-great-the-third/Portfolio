import { Component, Input } from '@angular/core';
import { Project } from '../../models/project';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Competence } from '../../models/competence';
import { CompetencesService } from '../../services/competences.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './project-card.html',
  styleUrl: './project-card.css',
})
export class ProjectCard {
  public date: string = "";
  public competences: Observable<Competence[]> = of([]);

  @Input()
  public project: Project = new Project;

  constructor(
    private competencesService: CompetencesService
  ) { }

  ngOnInit() {
    this.competences = this.competencesService.getCompetencesOnProject(this.project.id)
    this.date = new Date(this.project.dates).toLocaleDateString("fr-FR");
  }

  getCategoryClass() {
    switch(this.project.id_categorie) {
      case 1: return 'success';
      case 2: return 'info';
      case 3: return 'warning';
      case 4: return 'danger';
      default: return 'secondary';
    }
  }
}
