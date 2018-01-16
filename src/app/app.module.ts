import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TopicPage } from '../pages/topic/topic';
import { CategoryListPage } from '../pages/category-list/category-list';
import { CategoryPage } from '../pages/category/category';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file'
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
    TopicPage,
    CategoryListPage,
    CategoryPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      mode: 'ios'
    }),
    IonicStorageModule.forRoot(),
    CloudModule.forRoot(cloudSettings),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TopicPage,
    CategoryListPage,
    CategoryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    IonicStorageModule,
    File,
    ContentUpdater,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
