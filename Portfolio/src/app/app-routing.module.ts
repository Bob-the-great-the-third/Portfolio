import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page/main-page.component';

const routes: Routes = [
  {path:"",component:MainPageComponent},
  // {path:"",component:ProjectListComponent},
  // {path:"",component:MenuListComponent},
  // {path:"menus/new",component:MenuEditComponent},
  // {path:"menus/:id",component:MenuDetailComponent},
  // {path:"menus/:id/edit",component:MenuEditComponent},
  // {path:"menus/:idMenu/plats/new", component:PlatEditComponent},
  // {path:"menus/:idMenu/plats/:id/edit",component:PlatEditComponent},
  // {path:"sort/menus/:field/search", component:MenuListComponent},
  // {path:"sort/plats/:field/search", component:PlatCardListComponent},
  // {path:"sort/menus/:field/search/:query", component:MenuListComponent},
  // {path:"sort/plats/:field/search/:query", component:PlatCardListComponent},
  // {path:"plats", component:PlatCardListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
