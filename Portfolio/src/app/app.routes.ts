import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { ProjectDetail } from './projects/project-details/project-details';
import { ProjectsList } from './projects/projects-list/projects-list';

export const routes: Routes = [
  {path:"",component:MainPageComponent},
  {path:"projects", component:ProjectsList},
  {path:"projects/:id", component:ProjectDetail},
  // Ajoute tes routes ici selon ton app-routing.module.ts actuel
  // Exemple :
  // { path: '', redirectTo: '/menus', pathMatch: 'full' },
  // { path: 'menus', component: MenuListComponent },
  // { path: 'menus/:id', component: MenuDetailComponent },
  // { path: 'menus/:id/edit', component: MenuEditComponent },
  // etc.
];