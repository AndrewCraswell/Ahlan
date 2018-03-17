import { Component } from '@angular/core';
import * as Content from "../../model/appContent";

@Component({
  selector: 'card-text',
  templateUrl: 'cardText.html'
})
export class CardText {
  article: Content.CardTextBlock;

  constructor() {
  }
}