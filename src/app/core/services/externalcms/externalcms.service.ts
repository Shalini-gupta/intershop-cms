import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { createClient} from 'contentful';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ExternalcmsService {
  private client = createClient({
    space: environment.space,
    accessToken: environment.accessToken,
  });
  constructor() {}

  getContents(){
    const promise = this.client.getEntry("KteDVnagVrsY2gKLdHaPb")
    return from(promise)
  }
}
