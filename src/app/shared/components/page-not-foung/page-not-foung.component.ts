import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-not-foung',
  templateUrl: './page-not-foung.component.html',
  styleUrls: ['./page-not-foung.component.css']
})
export class PageNotFoungComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToMainPage(): void {
    this.router.navigate(['main']);
  }

}
