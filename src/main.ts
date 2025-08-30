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
import { provideRouter, TitleStrategy } from '@angular/router';
import { routes } from './app/app.routes';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedService } from './app/shared/service/shared.service';
import { APP_BASE_HREF } from '@angular/common';
import { appInitFactory } from './app/app-init.factory';
import { UserService } from './app/services/user/user.service';
import { AuthService } from './app/auth/auth.service'; 


bootstrapApplication(AppComponent, {
  // ...appConfig,
  providers: [

    {
      provide: APP_INITIALIZER,
      useFactory: appInitFactory,
      deps: [AuthService, UserService],
      multi: true
    }
    ,
    // 1) Register the Router (this sets up the default TitleStrategy)
    provideRouter(routes),

    // 2) **Override** the TitleStrategy after the router
    { provide: TitleStrategy, useClass: SharedService },

    // 3) Your other providers
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr({ timeOut: 3000, positionClass: 'toast-top-right', preventDuplicates: true }),
    importProvidersFrom(BsDatepickerModule.forRoot()),
    { provide: APP_BASE_HREF, useValue: '/' },
    ...appConfig.providers,
 
  ]

}).catch((err) => console.error(err));
