import { Injectable } from '@angular/core';
import { Observable , of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // isLoggedIn : boolean = true;
  // role : any = '';

  constructor()
  {
  
    // this.role = (localStorage.getItem('ROLE'));
    // console.log('Service here', this.role);
  }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => this.isLoggedIn = true)
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  

  todo = [
    'Get to work',
    'Buy Lunch',
    'Go home',
    'Fall asleep'
  ];
  started = [
    'UI',
    'Design',
    'C#',
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
  ];
}
