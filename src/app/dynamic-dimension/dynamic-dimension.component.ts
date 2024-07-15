import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-dynamic-dimension',
  standalone: true,
  imports: [
    MatTooltipModule
  ],
  templateUrl: './dynamic-dimension.component.html',
  styleUrl: './dynamic-dimension.component.css'
})
export class DynamicDimensionComponent implements OnInit {

  dynamicWidth:number = 200;

  ngOnInit(): void {
    const storedWidth = localStorage.getItem('dynamicWidth');
    this.dynamicWidth = Number(storedWidth);
  }

  onResizeStart(event: MouseEvent){
    // 웹 브라우저의 기본 동작을 제한
    event.preventDefault();
    // 최초 마우스 x축 위치와 width값 저장
    const initialMouseX = event.clientX;
    const initialWitdh = this.dynamicWidth;
    // mousemove 이벤트 리스너 정의
    const handleMouseMove = (moveEvent: MouseEvent) => {
      // 마우스가 이동한 거리 계산
      const deltaX = moveEvent.clientX - initialMouseX;
      // 크기 반영, 최소 크기 250으로 제한
      this.dynamicWidth = Math.max(250, initialWitdh + deltaX);
      // this.dynamicWidth = initialWitdh + deltaX;
      // 또 다른 요소 크기 조절을 위한 메서드 호출
      this.updateOtherDivWidth();
    };
    // mouseup 이벤트 리스너 정의
    const handleMouseUp = () => {
      localStorage.setItem('dynamicWidth', JSON.stringify(this.dynamicWidth));
      // mousemove, mouseup 이벤트 제거
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  updateOtherDivWidth(): void {
    const containerElement = document.querySelector('.dynamic-container') as HTMLElement | null;
    const otherElement = document.querySelector('.adjustable-second-element') as HTMLElement | null;
    if (containerElement && otherElement) {
      const containerWidth = containerElement.clientWidth;
      const firstElementWidth = this.dynamicWidth;
      const otherDivWidth = containerWidth - firstElementWidth;
      otherElement.style.width = `${otherDivWidth}px`;
    }
  }

  getOtherDivWidth():string {
    const containerWidth = document.querySelector('.dynamic-container')?.clientWidth || 0;
    const firstElementWidth = this.dynamicWidth;
    const otherDivWidth = containerWidth - firstElementWidth;
    return `${otherDivWidth}px`;
  }

}
