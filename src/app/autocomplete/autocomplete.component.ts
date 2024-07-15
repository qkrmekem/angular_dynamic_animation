import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('carSearchInput', {read: ElementRef}) carInput!: ElementRef;

  cars: any = [];
  showSearches: boolean = false;
  isSearching: boolean = false;
  searchedCars: any = [];

  constructor(){
    this.cars = ['Audi', 'BMW', 'Bugatti', 'Ferrari', 'Ford', 'Lamborghini', 
      'Mercedes Benz', 'Porsche', 'Rolls-Royce', 'Volkswagen'];
  }

  ngOnInit(): void {
    this.carSearch();
  }

  carSearch(){
    const search$ = fromEvent(this.carInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap((term) => term? this.getCars(term) : of<any>(this.cars)),
      tap(() => {
        this.isSearching = false;
        this.showSearches = true;
      })
    );

    search$.subscribe(data => {
      this.isSearching = false;
      this.searchedCars = data;
    })
  }

  getCars(name: any) : Observable<any> {
    return of(this.filterCars(name));
  }

  filterCars(name: any) {
    return this.cars.filter((val: string) => val.toLowerCase().includes(name.toLowerCase()) === true);
  }
}
