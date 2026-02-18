import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Project } from '../../models/project';
import { ProjectsService } from '../../services/projects.service';
import { ProjectCard } from '../project-card/project-card';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports:[
    CommonModule,
    ProjectCard,
    RouterLink,
  ],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.css',
})

export class ProjectsList {
  public projects!: Observable<Project[]>;

  public query: string = "";

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {


    this.route.params.subscribe(params => {
      this.query = this.route.snapshot.params["query"] ?? "";

      const sortField = params["field"];
      if (sortField && sortField !== "default")
        this.projects = this.projectsService.searchProjectsSorted(this.query, sortField);
      else 
        this.projects = this.projectsService.searchProjects(this.query);
    })
  }
}
