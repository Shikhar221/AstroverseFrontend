import { bootstrapApplication } from '@angular/platform-browser';
import { provideIonicAngular } from '@ionic/angular';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [provideIonicAngular({ mode: 'md' })],
}).catch((error: unknown) => console.error(error));