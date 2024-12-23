import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { routes } from './app.routes';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpLoaderInterceptor } from './core/interceptors/http-loader.interceptor';
import { handlingErrorsInterceptor } from './core/interceptors/handling-errors.interceptor';
import { MessageService } from 'primeng/api';
import { httpHeadersInterceptor } from './core/interceptors/http-headers.interceptor';
import {CookieService} from 'ngx-cookie-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([
        httpLoaderInterceptor,
        handlingErrorsInterceptor,
        httpHeadersInterceptor
      ])
    ),
    importProvidersFrom(
      BrowserAnimationsModule,
    ),
    importProvidersFrom(
      NgxSpinnerModule.forRoot({
        type: 'square-jelly-box'
      })
    ),
    MessageService,
    importProvidersFrom(
      CookieService
    )
  ]
};
