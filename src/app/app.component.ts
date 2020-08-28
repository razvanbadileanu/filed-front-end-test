import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isOpen = false;
  link = 'payment';

  constructor(private router: Router) {} 

  onChangeRoute() {
    this.isOpen ? this.link = '' : this.link = 'payment';
    this.router.navigate([this.link]);
    this.isOpen = !this.isOpen;
  }
}

