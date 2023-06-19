import { Component } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';

import "/src/assets/js/script.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'task';
  showSidebar: boolean = true;
  showNavbar: boolean = true;
  showFooter: boolean = true;

   //Change RTL direction
   textDir: string = 'ltr';

   constructor(private router: Router) { 
    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => { 
      if(event instanceof NavigationStart) {
        if((event['url'] == '/forgot-password') || (event['url'] == '/login')) {
          this.showSidebar = false;
          this.showNavbar = false;
          this.showFooter = false;
          document.querySelector('.main-panel')?.classList.add('w-100');
          document.querySelector('.page-body-wrapper')?.classList.add('full-page-wrapper');
          document.querySelector('.content-wrapper')?.classList.add('bg-img');
        } else {
          this.showSidebar = true;
          this.showNavbar = true;
          this.showFooter = true;
          document.querySelector('.main-panel')?.classList.remove('w-100');
          document.querySelector('.page-body-wrapper')?.classList.remove('full-page-wrapper');
          document.querySelector('.content-wrapper')?.classList.remove('bg-img');
        }
      }
    });

  }
  
}
