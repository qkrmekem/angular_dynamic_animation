import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { ReusableAnimationTestComponent } from './reusable-animation-test/reusable-animation-test.component';
import { DynamicDimensionComponent } from './dynamic-dimension/dynamic-dimension.component';

export const customAnimation = {
  'openClose': trigger('openClose', [
    state(
      'open',
      style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow',
      }),
    ),
    state(
      'closed',
      style({
        height: '100px',
        // opacity: .8,
        backgroundColor: 'transparent',
        backdropFilter: 'blur(60px)',
        // '-webkit-backdrop-filter': 'blur(40px)',
      }),
    ),
    transition('open => closed', [animate('1s')]),
    transition('closed => open', [animate('0.5s')]),
  ]),
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReusableAnimationTestComponent, DynamicDimensionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    customAnimation.openClose
  ]
})
export class AppComponent {
  isOpen = true;

  constructor(){
    setTimeout(() => this.editAnimation(), 10);
  }

  toggle(){
    this.isOpen = !this.isOpen;
  }

  editAnimation(){
    customAnimation.openClose = trigger('openClose', [
      state(
        'open',
        style({
          height: '200px',
          opacity: 1,
          backgroundColor: 'blue',
        }),
      ),
      state(
        'closed',
        style({
          height: '100px',
          // opacity: .8,
          backgroundColor: 'transparent',
          backdropFilter: 'blur(60px)',
          // '-webkit-backdrop-filter': 'blur(40px)',
        }),
      ),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]);
  }
}
