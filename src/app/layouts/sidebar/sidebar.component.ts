import { Component, OnInit } from '@angular/core';
declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: 'manage-user/manage-userlist', title: "manage-userlist", class: "" },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems!: any[];
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  public menuBtn(){
    //alert("click event");
    document.querySelector('.mainpage')?.classList.toggle('sidebar-icon-only');
    document.querySelector('.sidebar')?.classList.toggle('active');
  }

  myFunction(){
    document.querySelector('.nav-item')?.classList.toggle('hover-open');
  }

}
