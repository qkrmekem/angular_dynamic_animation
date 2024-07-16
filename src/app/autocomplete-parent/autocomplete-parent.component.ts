import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';

@Component({
  selector: 'app-autocomplete-parent',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent],
  templateUrl: './autocomplete-parent.component.html',
  styleUrl: './autocomplete-parent.component.css'
})
export class AutocompleteParentComponent {
  car: string = '';

  setCarName($event: any){
    this.car = $event.name;
  }
}
