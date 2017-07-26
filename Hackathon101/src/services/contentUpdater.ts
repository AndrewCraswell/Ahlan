import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

@Injectable()
export class ContentUpdater {

  constructor(private storage: Storage, private http: Http) { }

  refreshContent() {
      var url = 'https://cdn.contentful.com/spaces/ufhb7fd3pkxt/entries?access_token=a5208b6adf33f3e44bfa3e1834b8214c155f62ee67f44df4983d2ab02b248a2a&locale=*&limit=1000';
      var response = this.http.get(url);
      var saved = false;
      response.forEach(r => {
          if (!saved && r.ok) {
            this.storage.set('content', r.json());
            saved = true;
            //console.log(r.json());
          }
     });
  }

}
