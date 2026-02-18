import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';

import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project';
import { ProjectImage } from '../../models/project-image';
import { RouterLink } from '@angular/router'; // ✅ Importe RouterLink
import { Langage } from '../../models/langage';       // adjust path  
import { Competence } from '../../models/competence'; // adjust path  
import { Categorie } from '../../models/categorie';     // adjust path
import { CategoriesService } from '../../services/categories.service';
import { CompetencesService } from '../../services/competences.service';
import { LangagesService } from '../../services/langages.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [
    RouterLink,  // ✅ Ajoute RouterLink ici dans imports
    CommonModule
  ],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  langages: Langage[] = [];
  competences: Competence[] = [];
  categories: Categorie[] = [];

  items: Project[] = [];
  images: ProjectImage[] = [];
  currentIndex = 0;
  progress = 0;

  private progressSub?: Subscription;

  cooldown = 5000;
  paused = false;
  isLoaded = false;

  constructor(
    private projectService: ProjectsService,
    private categoriesService: CategoriesService,
    private competencesService: CompetencesService,
    private langagesService: LangagesService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.projectService.getStarredProjects().subscribe(projects => {
      this.items = projects;

      if (!projects.length) return;

      this.projectService.getProjectsImages(projects).subscribe(images => {

        console.log(images)

        this.images = images;
        this.currentIndex = 0;
        this.isLoaded = true;

        this.cdr.detectChanges(); // ✅ FORCE first render
        this.startProgress();
      });
    });

    this.langagesService.getLangages().subscribe(l => this.langages = l);
    this.competencesService.getCompetences().subscribe(c => this.competences = c);
    this.categoriesService.getAllCategs().subscribe(c => this.categories = c);

  }

  ngOnDestroy() {
    this.clearInterval();
  }

  private clearInterval() {
    this.progressSub?.unsubscribe();
    this.progressSub = undefined;
  }

  private startInterval() {
    this.clearInterval();

    const step = 100 / (this.cooldown / 50);

    this.progressSub = interval(50).subscribe(() => {
      this.progress += step;

      if (this.progress >= 100) {
        this.next();
      }

      this.cdr.markForCheck(); // ✅ FORCE repaint
    });
  }

  startProgress() {
    if (!this.isLoaded) return;
    this.progress = 0;
    this.paused = false;
    this.startInterval();
  }

  pauseProgress() {
    this.paused = true;
    this.clearInterval();
    this.cdr.markForCheck();
  }

  resumeProgress() {
    if (!this.paused || !this.isLoaded) return;
    this.paused = false;
    this.startInterval();
  }

  next() {
    if (!this.isLoaded) return;

    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.progress = 0;

    if (!this.paused) {
      this.startInterval();
    }

    this.cdr.markForCheck();
  }

  prev() {
    if (!this.isLoaded) return;

    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.progress = 0;

    if (!this.paused) {
      this.startInterval();
    }

    this.cdr.markForCheck();
  }

  goTo(index: number) {
    if (!this.isLoaded) return;

    this.currentIndex = index;
    this.progress = 0;

    if (!this.paused) {
      this.startInterval();
    }

    this.cdr.markForCheck();
  }

  get currentImage(): ProjectImage | null {
    return this.images[this.currentIndex] ?? null;
  }

  getLanguages(projectId: number): Langage[] {
    return this.langages.filter(l => l.project_id === projectId);
  }

  getCompetences(projectId: number): Competence[] {
    return this.competences.filter(c => c.project_id === projectId);
  }

  getCategoryName(id: number): string {
    return this.categories.find(c => c.id === id)?.categ ?? 'N/A';
  }
}