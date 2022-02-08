import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ish-home-contentful-page',
  templateUrl: './home-contentful-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeContentfulPageComponent{
  @Input() homeData : Observable<any>;
  constructor(){}
}
