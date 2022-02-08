import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'ish-shared/shared.module';

import { HomePageComponent } from './home-page.component';

import {HomeContentfulPageComponent} from '../home-contentful/home-contentful-page.component';

const homePageRoutes: Routes = [{ path: '', component: HomePageComponent, data: { wrapperClass: 'homepage' } }];
@NgModule({
  imports: [RouterModule.forChild(homePageRoutes), SharedModule],
  declarations: [HomePageComponent,HomeContentfulPageComponent],
})
export class HomePageModule {}
