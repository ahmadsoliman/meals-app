import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridModule, SharedModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainModule } from './main/main.module';
import { CoreModule } from './core/core.module';
import { NgxsModule } from '@ngxs/store';
import { appStates } from './app.state';
import { environment } from '@env/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    BrowserAnimationsModule,
    MainModule,
    SharedModule,
    CoreModule,
    NgxsModule.forRoot(appStates, { developmentMode: !environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
