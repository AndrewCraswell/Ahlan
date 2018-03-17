import { Component } from '@angular/core';
import * as Content from "../../model/appContent";

@Component({
  selector: 'card-example-comparison',
  templateUrl: 'CardExampleComparison.html'
})
export class CardExampleComparison {
  article: Content.CardExampleComparison;

  constructor() {
  }
}
