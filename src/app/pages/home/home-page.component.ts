import { ChangeDetectionStrategy, Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { ExternalcmsService } from '../../core/services/externalcms/externalcms.service';
@Component({
  selector: 'ish-home-page',
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit{
  homeContent$: Observable<any>;
  constructor(
    private externalcmsService: ExternalcmsService,
    @Inject(PLATFORM_ID) private platformId: Object
    ){}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.homeContent$ = this.externalcmsService.getContents();
    }
  }
}
