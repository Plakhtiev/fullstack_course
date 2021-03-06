import { MaterialService } from './../../classes/material.service';
import { Router } from '@angular/router';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.services';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements AfterViewInit {


  @ViewChild('floating') floatingRef!: ElementRef;
  links = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analitics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' },
  ]

  constructor(private auth: AuthService,
    private router: Router) {

  }

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event?.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }
}
