import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './servicios/util/custom-paginator';
import { ToastrModule } from 'ngx-toastr';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { CompartirModule } from './componentes/compartir.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './feature/layout.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorHttpService } from './servicios/interceptor-http/interceptor-http.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CompartirModule,
    CoreModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: CustomPaginator      
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorHttpService,
      multi: true

    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
