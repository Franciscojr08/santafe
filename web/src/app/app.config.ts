import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import {provideAnimations} from "@angular/platform-browser/animations";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {getPortuguesePaginatorIntl} from "./utils/functions";
import {provideEnvironmentNgxMask} from "ngx-mask";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(
      { eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() },
    provideEnvironmentNgxMask()
  ]
};
