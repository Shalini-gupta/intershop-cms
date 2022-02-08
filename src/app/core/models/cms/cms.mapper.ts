import { Injectable } from '@angular/core';
import { cmsData } from './cms.interface';
import { CMS } from './cms.model';

@Injectable({providedIn: 'root'})
export class CMSMapper {
   fromData(data: cmsData): CMS {
    if (data) {
      return {
        name: data.name,
      };
    } else {
      throw new Error(`'CountryData' is required for the mapping`);
    }
  }
}