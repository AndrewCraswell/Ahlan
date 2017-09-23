import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ItemDetailsPage } from '../pages/item-details/item-details';
import { CategoryPage } from '../pages/category/category';
import { SubCategoryPage } from '../pages/sub-category/sc-details';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from "@angular/http";
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { ContentUpdater } from "../services/contentUpdater";

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '99d3db46'
  }
};

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    CategoryPage,
    SubCategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ItemDetailsPage,
    CategoryPage,
    SubCategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicStorageModule,
    ContentUpdater,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
