import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { authReducer } from './services/auth/auth.reducer';
import { StoreModule, provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes), 
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
     provideStore(),
     provideStore({ auth: authReducer }),
    //  provideClientHydration(withEventReplay()),
     provideHttpClient(withInterceptorsFromDi()), provideAnimationsAsync()]
};
