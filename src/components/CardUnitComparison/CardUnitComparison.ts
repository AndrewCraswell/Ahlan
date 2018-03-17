import { Component } from '@angular/core';
import * as Content from "../../model/appContent";

@Component({
  selector: 'card-unit-comparison',
  templateUrl: 'CardUnitComparison.html'
})
export class CardUnitComparison {
  article: Content.CardUnitComparison;

  constructor() {
  }
}
