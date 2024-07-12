import { AnimationBuilder, AnimationStyleMetadata, style } from '@angular/animations';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { AnymationCreateFactory } from '../classes/animations.factory';

type AnimationKeys = 'open' | 'close';

export interface CustomAnimationDefinition{
  style: AnimationStyleMetadata;
  time: string;
}

export const animationCustomDefinition: Record<AnimationKeys, CustomAnimationDefinition> = {
  'open': {
    style: style({
      height: '200px',
      opacity: 1,
      backgroundColor: 'blue',
    }),
    time: '1s'
  },

  'close': {
    style : style({
      height: '100px',
      backgroundColor: 'transparent',
      backdropFilter: 'blur(60px)',
    }),
    time: '0.5s'
  }
      
}

@Component({
  selector: 'app-reusable-animation-test',
  standalone: true,
  imports: [],
  templateUrl: './reusable-animation-test.component.html',
  styleUrl: './reusable-animation-test.component.css'
})
export class ReusableAnimationTestComponent{

  @ViewChild('animationTarget', {read: ElementRef, static: true}) target!: ElementRef;

  builder = inject(AnimationBuilder);
  elementRef = inject(ElementRef);

  factory = new AnymationCreateFactory();

  isOpen = false;
  openStatus: AnimationKeys = 'close';

  toggle(){
    // const end = animationCustomDefinition[this.isOpen ? 'close' : 'open'];
    const aniFactory = this.factory.createAnimation(animationCustomDefinition[this.openStatus]);
    const player = aniFactory.create(this.target.nativeElement);
    player.play();
    this.isOpen = !this.isOpen;
    this.openStatus = this.isOpen ? 'open' : 'close';
  }

}
