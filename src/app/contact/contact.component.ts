import { Component, OnInit , ViewChild , AfterContentInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
/// <reference types="@types/googlemaps" />

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit  {
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  ngOnInit(): void {

    const mapProp = {
      center: new google.maps.LatLng(51.6404, -1.38464),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP  // or Satellite
  };
  setTimeout(()=>{
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    var marker = new google.maps.Marker({ position: mapProp.center });
    marker.setMap(this.map);

  },1000)
   
 
   
  }
  ngAfterContentInit(): void {
 
 }

  //maaz
  //https://script.google.com/macros/s/AKfycbxWgbhzcp0_-lMbH7vF5O4OSsXwHHNm4LVOwPcAtgzyYlG1icP34cHpbn-5KjAzyYTJnQ/exec

  //AKfycbxWgbhzcp0_-lMbH7vF5O4OSsXwHHNm4LVOwPcAtgzyYlG1icP34cHpbn-5KjAzyYTJnQ
  
  form: FormGroup;
  name: FormControl = new FormControl("", [Validators.required]);
  email: FormControl = new FormControl("", [Validators.required, Validators.email]);
  message: FormControl = new FormControl("", [Validators.required, Validators.maxLength(256)]);
  honeypot: FormControl = new FormControl(""); // we will use this to prevent spam
  submitted: boolean = false; // show and hide the success message
  isLoading: boolean = false; // disable the submit button if we're loading
  responseMessage: string = ''; // the response message to show to the user

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.form = this.formBuilder.group({
      name: this.name,
      email: this.email,
      message: this.message,
      honeypot: this.honeypot
    });

  //   const uluru = { lat: 53.33982, lng: -6.27141 };
  //   // The map, centered at Uluru
  //   const map = new google.maps.Map(document.getElementById("map"), {
  //     zoom: 15,
  //     center: uluru,
  //   });
  //   // The marker, positioned at Uluru
  //   const marker = new google.maps.Marker({
  //     position: uluru,
  //     map: map,

    
  // })
  }
 

  onSubmit() {

    if (this.form.status == "VALID" && this.honeypot.value == "") {
      this.form.disable(); // disable the form if it's valid to disable multiple submissions
      var formData: any = new FormData();
      formData.append("name", this.form.get("name")!.value);
      formData.append("email", this.form.get("email")!.value);
      formData.append("message", this.form.get("message")!.value);
      this.isLoading = true; // sending the post request async so it's in progress
      this.submitted = false; // hide the response message on multiple submits
      this.http.post("https://script.google.com/macros/s/AKfycbxWgbhzcp0_-lMbH7vF5O4OSsXwHHNm4LVOwPcAtgzyYlG1icP34cHpbn-5KjAzyYTJnQ/exec", formData).subscribe(
        (response : any) => {
          // choose the response message
          if (response["result"] == "success") {
            this.responseMessage = "Thanks for the message! I'll get back to you soon!";
          } else {
            this.responseMessage = "Oops! Something went wrong... Reload the page and try again.";
          }
          this.form.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(response);
        },
        (error) => {
          this.responseMessage = "Oops! An error occurred... Reload the page and try again.";
          this.form.enable(); // re enable the form after a success
          this.submitted = true; // show the response message
          this.isLoading = false; // re enable the submit button
          console.log(error);
        }
      );
    }

 }
}

