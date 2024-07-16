import { P } from '@angular/cdk/keycodes';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('carSearchInput', {read: ElementRef, static:true}) carInput!: ElementRef;
  @Output() setCarNameEvent = new EventEmitter<{name:string}>();

  cars: any = [];
  showSearches: boolean = false;
  isSearching: boolean = false;
  searchedCars: any = [];

  constructor(){
    this.cars = ['Audi', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 
      'Mercedes Benz', 'Porsche', 'Rolls-Royce', 'Volkswagen'];
    this.searchedCars = this.cars;
  }

  ngOnInit(): void {
    this.carSearch();
  }

  carSearch(){
    const search$ = fromEvent(this.carInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      // 현재 값이 이전 값과 다를 때만 요청
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap((term) => term? this.getCars(term) : of<any>(this.cars)),
      tap(() => {
        this.isSearching = false;
        this.showSearches = true;
      })
    );

    search$.subscribe(data => {
      // this.isSearching = false;
      this.searchedCars = data;
    })
  }

  getCars(name: any) : Observable<any> {
    return of(this.filterCars(name));
  }

  filterCars(name: any) {
    return this.cars.filter((val: string) => val.toLowerCase().includes(name.toLowerCase()) === true);
  }

  setCarName(name: string){
    this.searchedCars = this.filterCars(name);
    this.setCarNameEvent.emit({name});
    this.carInput.nativeElement.valeu = name;
    this.showSearches = false;
  }

  trackById(index: number, item: any){
    return item._id;
  }
}
