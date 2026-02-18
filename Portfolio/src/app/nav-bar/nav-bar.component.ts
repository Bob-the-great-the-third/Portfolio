import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ], // Ajoute ceci
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  public query:string="";
  public table:string="menus";

  constructor(
    // private menuLocal:MenuLocalService,
    private router:Router,
  ){}

  serveAll(){
    // this.menuLocal.serveAll()
  }

  resetService(){
    // this.menuLocal.resetService()
  }

  searchQuery(){
    const path:string="/sort/"+this.table+"/default/search/"+this.query;
    console.log(path)
    this.router.navigateByUrl(path)
  }
}