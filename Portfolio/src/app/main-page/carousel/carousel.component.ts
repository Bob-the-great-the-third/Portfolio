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
    private cdr: ChangeDetectorRef
  ) {}

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
}