import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

animateValue(obj: any, start: number, end: number, duration: number) {
    let startTimestamp: any= null;
    const step = (timestamp: any) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  


  constructor() { }

  ngOnInit(): void {
    const obj1 = document.getElementById("value1");
    this.animateValue(obj1, 0, 150, 3000);
    const obj2 = document.getElementById("value2");
    this.animateValue(obj2, 0, 100, 3000);
    const obj3 = document.getElementById("value3");
    this.animateValue(obj3, 0, 500, 3000);
    const obj4 = document.getElementById("value4");
    this.animateValue(obj4, 0, 1600, 3000);
  }

}


