import { bootstrapApplication } from '@angular/platform-browser';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { apiKeyInterceptor } from './app/interceptors/api-key.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'enabled' })),
  ],
}).catch((err: unknown) => console.error(err));
