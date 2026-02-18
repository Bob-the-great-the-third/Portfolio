import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { WhoAmIComponent } from '../who-am-i/who-am-i.component';
import { ProjectsList } from '../../projects/projects-list/projects-list';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CarouselComponent, WhoAmIComponent, ProjectsList], // Ajoute-les ici
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'

})
export class MainPageComponent {

}
