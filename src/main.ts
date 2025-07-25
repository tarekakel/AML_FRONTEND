// import { bootstrapApplication } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
// import { AppComponent } from './app/app.component';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { importProvidersFrom } from '@angular/core';
// import { provideHttpClient } from '@angular/common/http';

// bootstrapApplication(AppComponent, {
//   ...appConfig,
//   providers: [
//     ...(appConfig.providers || []),
//     provideRouter(routes),
//     provideHttpClient(),
//   ],
// })
//   .catch((err) => console.error(err));

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

bootstrapApplication(AppComponent, {

  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideAnimations(), // Required for animations
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
}).catch((err) => console.error(err));
