import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ElementRef } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  data; 
  name:string = null;
  profile_pic:string = "../../../assets/unknown.jpg";
  profile_link:string = null;

  //TODO: inject the Spotify service
  constructor(private http: SpotifyService, private elementRef: ElementRef) { }

  ngOnInit() {
    // this.elementRef.nativeElement.querySelector('btn btn-light').adEventListener('click', this.fetchData); 
  }

  async fetchData(){
    this.data = await this.http.aboutMe(); 
    console.log(this.data); 
    this.name = this.data.name; 
    this.profile_pic = this.data.imageURL; 
    this.profile_link = this.data.spotifyProfile; 
  }



  /*TODO: create a function which gets the "about me" information from Spotify when the button in the view is clicked.
  In that function, update the name, profile_pic, and profile_link fields */

}
