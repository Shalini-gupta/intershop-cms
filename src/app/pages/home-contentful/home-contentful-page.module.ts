import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'ish-shared/shared.module';
import { HomeContentfulPageComponent } from './home-contentful-page.component';

const homeContentfulPageRoutes: Routes = [{ path: '', component: HomeContentfulPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(homeContentfulPageRoutes), SharedModule],
  declarations: [
    HomeContentfulPageComponent
  ],
})
export class HomeContentfulPageModule { }
