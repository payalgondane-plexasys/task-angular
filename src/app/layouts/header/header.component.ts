import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit { 

 constructor(private router: Router) {}


  ngOnInit(){ 
   console.log("working");
   
  }
  logout(){
    // this.auth.logout();
    console.log("working");
  }
  public menuBtn(){
    //alert("click event");
    document.querySelector('.mainpage')?.classList.toggle('sidebar-icon-only');
    document.querySelector('.sidebar-offcanvas')?.classList.toggle('active');  
  }

}
