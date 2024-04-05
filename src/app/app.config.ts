import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Update import
import { TokenInterceptor } from '../Interceptor/token.interceptor'; // Correct import statement
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Correct import statement
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    BrowserAnimationsModule, // Add BrowserAnimationsModule directly if needed
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true // TokenInterceptor is a multi-provider
    },
    provideToastr()
  ]
};
