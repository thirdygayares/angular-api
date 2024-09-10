Create folder **components**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725088482834/e6bcfe9d-b2e2-4819-b455-f999c2ca15fd.png)

Generate 4 components

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725088547766/babf3fe3-749d-484f-9e32-86108e3109c0.png)

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725088870903/3bab5ad5-e3cc-48de-8234-def961e34661.png)

Move the three folders to the components folder

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725088926182/1918d300-8009-4744-9387-6ac9a79d686c.png)

Add app.module.ts

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725089334004/9f5e3281-34d4-4857-b246-0a2220d47c34.png)

Content of app.module.ts

```bash
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppComponent} from "./app.component";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {LoginComponent} from "./components/login/login.component";
import {ServicesComponent} from "./components/services/services.component";



const routes: Routes = [
  // Main layout routes
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'services', component: ServicesComponent },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {enableTracing: true}), // Only for debugging purposes
  ],
  exports: [RouterModule],

  declarations: [
    AppComponent,


  ],
  providers: [
    provideAnimationsAsync(),
    ],

  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
```

In all components remove standalone: true, imports: \[\],

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725089319825/19acf5ef-a97e-4afe-bf49-7b3c4a9f8286.png)

in main.ts

```bash
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

in app.component.html

```bash
<a routerLink="/">Homepage</a>
<br>
<a routerLink="/login">Login</a>
<br>
<a routerLink="/services">Services</a>
<router-outlet></router-outlet>
```

# **OUTPUT**

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1725096655852/45c6de75-69b3-4d0e-896f-eec0b3ab462d.gif)

Github link

[https://github.com/Thirdy-Lecture/Angular-Routing.git](https://github.com/Thirdy-Lecture/Angular-Routing.git)
