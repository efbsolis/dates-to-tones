import { Component } from '@angular/core';

import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  // SYSTEM STUFF
  systemMessage: string = "";
  showHint: boolean = true;

  // SOUNDS
  soundEnabled: boolean = false;
  context = new AudioContext();
  baseOscillator = this.context.createOscillator();
  oscillator1 = this.context.createOscillator();
  oscillator2 = this.context.createOscillator();
  baseFrequency: number = 432;
  highestFrequency: number = 4320; // max osc val is 240000
  secondFrequency: number = this.baseFrequency;
  thirdFrequency: number = this.baseFrequency;

  // DATES AND FIGURES
  calendarDate1: string = '1970-01-01';
  calendarDate2: string = '1970-01-01';
  dayOfYear1: any = 1;
  dayOfYear2: any = 1;
  firstRange: number = 0;
  secondRange: number = 365;
  firstRatio: number = 0;
  secondRatio: number = 0;

  // TEXT CONFIG
  firstRangePlural: string = "s";
  secondRangePlural: string = "s";

  onKey(keyNumber: number){
    let successData: boolean = true;

    if(keyNumber === 1) {
      if(moment(this.calendarDate1).format("DDD") !== "Invalid date") {
        this.systemMessage = "";
        this.dayOfYear1 = moment(this.calendarDate1).format("DDD");
      } else {
        this.systemMessage = "Please pick valid first date."
        successData = false;
      }
    } else {
      if(moment(this.calendarDate2).format("DDD") !== "Invalid date") {
        this.systemMessage = "";
        this.dayOfYear2 = moment(this.calendarDate2).format("DDD");
      } else {
        this.systemMessage = "Please pick valid second date.";
        successData = false;
      }
    }

    if(successData) {
      this.firstRange = Math.abs(this.dayOfYear2 - this.dayOfYear1);
      this.secondRange = Math.abs(365 - this.firstRange);
      (this.firstRange == 1) ? this.firstRangePlural = "" : this.firstRangePlural = "s";
      (this.secondRange == 1) ? this.secondRangePlural = "" : this.secondRangePlural = "s";
      this.firstRatio = this.firstRange / this.secondRange;
      this.secondRatio = this.secondRange / this.firstRange;
      this.secondFrequency = this.baseFrequency * (this.firstRatio + 1);
      this.thirdFrequency = this.secondFrequency * this.secondRatio;

      if(this.soundEnabled) {
        if(isFinite(this.secondFrequency)) {
          if(this.secondFrequency > this.highestFrequency) {
            this.oscillator1.frequency.value = this.highestFrequency;
          } else {
            this.oscillator1.frequency.value = this.secondFrequency;
          }
        } else {
          this.oscillator1.frequency.value = this.highestFrequency;
        }
        if(isFinite(this.thirdFrequency)) {
          if(this.thirdFrequency > this.highestFrequency) {
            this.oscillator2.frequency.value = this.highestFrequency;
          } else {
            this.oscillator2.frequency.value = this.thirdFrequency;
          }
        } else {
          this.oscillator2.frequency.value = this.highestFrequency;
        }
      }

    }

  }

  toggleSound(): void {
      if(!this.soundEnabled) {
        this.soundEnabled = true;
        this.baseOscillator.connect(this.context.destination);
        this.oscillator1.connect(this.context.destination);
        this.oscillator2.connect(this.context.destination);
      } else {
        this.soundEnabled = false;
        this.baseOscillator.disconnect(this.context.destination);
        this.oscillator1.disconnect(this.context.destination);
        this.oscillator2.disconnect(this.context.destination);
      }
  }

  toggleHint():void {
    this.showHint = !this.showHint;
  }

  constructor() {
    this.baseOscillator.type = "sine";
    this.oscillator1.type = "sine";
    this.oscillator2.type = "sine";
    this.baseOscillator.frequency.value = this.baseFrequency;
    this.oscillator1.frequency.value = this.baseFrequency;
    this.oscillator2.frequency.value = this.baseFrequency;
    this.baseOscillator.start();
    this.oscillator1.start();
    this.oscillator2.start();
  }

}
