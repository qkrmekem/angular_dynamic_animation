import { AnimationBuilder, AnimationStyleMetadata, style } from '@angular/animations';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { AnymationCreateFactory } from '../classes/animations.factory';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

type AnimationKeys = 'open' | 'close';

export interface CustomAnimationDefinition{
  style: any;
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
export class ReusableAnimationTestComponent implements OnInit{
  http = inject(HttpClient);
  async ngOnInit(): Promise<void> {
    this.keys = await firstValueFrom(this.http.get('./assets/json/animation.data.json'))
    console.log(this.keys);
    this.animationDefinition = (await firstValueFrom(this.http.get('./assets/json/animation.data.json')) as any).animation_definition;
    console.log(this.animationDefinition);
    
  }

  keys = {} as any;
  animationDefinition: Record<AnimationKeys, any> = {} as Record<AnimationKeys, any>;


  @ViewChild('animationTarget', {read: ElementRef, static: true}) target!: ElementRef;

  builder = inject(AnimationBuilder);
  elementRef = inject(ElementRef);

  factory = new AnymationCreateFactory();

  isOpen = false;
  openStatus: AnimationKeys = 'close';
  

  toggle(){
    // const end = animationCustomDefinition[this.isOpen ? 'close' : 'open'];
    const aniFactory = this.factory.createAnimation(this.animationDefinition[this.openStatus]);
    console.log('팩토리', aniFactory);
    
    const player = aniFactory.create(this.target.nativeElement);
    player.play();
    this.isOpen = !this.isOpen;
    this.openStatus = this.isOpen ? 'open' : 'close';
  }

}
