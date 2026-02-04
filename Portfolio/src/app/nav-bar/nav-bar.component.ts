import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
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