import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  result: any;


  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {

    this.authService.currentUser$.subscribe((res: any) => {
      if (res) {
        this.result = res
      }

    });
  }
}
