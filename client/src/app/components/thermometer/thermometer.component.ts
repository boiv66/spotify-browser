import { Component, OnInit, Input } from '@angular/core';
import { TrackFeature } from 'src/app/data/track-feature';

@Component({
  selector: 'app-thermometer',
  templateUrl: './thermometer.component.html',
  styleUrls: ['./thermometer.component.css']
})
export class ThermometerComponent implements OnInit {

  //TODO: define Input fields and bind them to the template.
  @Input() feature: TrackFeature;
  color: string; 
  percent: string; 
  



  constructor() { }

  ngOnInit() {
  
  this.color = this.feature.color; 
  this.percent = (this.feature.percent*100).toString() + "%" 
  }

}
