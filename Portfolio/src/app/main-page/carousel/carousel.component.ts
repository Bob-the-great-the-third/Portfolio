import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectsService } from '../../services/projects.service';
import { Project } from '../../models/project';
import { ProjectImage } from '../../models/project-image';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {
  
  items: Project[] = [];
  images: ProjectImage[] = [];
  currentIndex = 0;
  progress = 0;
  interval: any = null;
  cooldown = 5000; // 5 seconds
  paused = false;
  isLoaded = false;

  constructor(private projectService: ProjectsService) {}

  ngOnInit() {
    this.projectService.getStarredProjects().subscribe(projects => {
      this.items = projects;
      
      if (projects.length > 0) {
        this.projectService.getProjectsImages(projects).subscribe(images => {
          this.images = images;
          this.currentIndex = 0;
          this.isLoaded = true;
          this.startProgress();
        });
      }
    });
  }

  ngOnDestroy() {
    this.clearInterval();
  }

  private clearInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private startInterval() {
    this.clearInterval();
    const step = 100 / (this.cooldown / 50);
    this.interval = setInterval(() => {
      this.progress += step;
      if (this.progress >= 100) {
        this.next();
      }
    }, 50);
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
  }

  resumeProgress() {
    if (this.paused && this.isLoaded) {
      this.paused = false;
      this.startInterval();
    }
  }

  next() {
    if (!this.isLoaded) return;
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.progress = 0;
    if (!this.paused) {
      this.startInterval();
    }
  }

  prev() {
    if (!this.isLoaded) return;
    this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
    this.progress = 0;
    if (!this.paused) {
      this.startInterval();
    }
  }

  goTo(index: number) {
    if (!this.isLoaded) return;
    this.currentIndex = index;
    this.progress = 0;
    if (!this.paused) {
      this.startInterval();
    }
  }

  get currentImage(): ProjectImage | null {
    if (!this.isLoaded || !this.images || this.images.length === 0) {
      return null;
    }
    return this.images[this.currentIndex] || null;
  }
}