import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { CarouselComponent } from './main-page/carousel/carousel.component';
import { MainPageComponent } from './main-page/main-page/main-page.component';
import { WhoAmIComponent } from './main-page/who-am-i/who-am-i.component';
import { DetailProjet } from './projets/detail-projet/detail-projet';
import { ListeProjets } from './projets/liste-projets/liste-projets';
import { ListProjects } from './projets/list-projects/list-projects';
import { ProjectCard } from './projects/project-card/project-card';
import { AppSeparateur } from './app-separateur/app-separateur';

@NgModule({
  declarations: [
    // Vide : tous les composants sont standalone
  
    DetailProjet,
    ListeProjets,
    ListProjects,
    ProjectCard,
    AppSeparateur
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppComponent,
    NavBarComponent,
    CarouselComponent,
    MainPageComponent,
    WhoAmIComponent
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }