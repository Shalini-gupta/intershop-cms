import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, Subject, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { Locale } from 'ish-core/models/locale/locale.model';
import { TestStore, ngrxTesting } from 'ish-core/utils/dev/ngrx-testing';
import { SetAvailableLocales, getCurrentLocale } from '../locale';
import { localeReducer } from '../locale/locale.reducer';

import { ApplyConfiguration, ConfigurationActionTypes } from './configuration.actions';
import { ConfigurationEffects } from './configuration.effects';
import { configurationReducer } from './configuration.reducer';
import { getFeatures, getRestEndpoint } from './configuration.selectors';

describe('Configuration Effects', () => {
  let actions$: Observable<Action>;
  let effects: ConfigurationEffects;
  let router: Router;
  let location: Location;
  let store$: TestStore;

  beforeEach(() => {
    // tslint:disable-next-line:use-component-change-detection
    @Component({ template: 'dummy' })
    // tslint:disable-next-line:prefer-mocks-instead-of-stubs-in-tests
    class DummyComponent {}

    TestBed.configureTestingModule({
      declarations: [DummyComponent],
      imports: [
        ...ngrxTesting({ configuration: configurationReducer, locale: localeReducer }, [ConfigurationEffects]),
        RouterTestingModule.withRoutes([{ path: 'home', component: DummyComponent }]),
      ],
      providers: [ConfigurationEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(ConfigurationEffects);
    router = TestBed.get(Router);
    location = TestBed.get(Location);
    store$ = TestBed.get(TestStore);
    store$.dispatch(new SetAvailableLocales({ locales: [{ lang: 'en_US' }, { lang: 'de_DE' }] as Locale[] }));
  });

  describe('setInitialRestEndpoint$', () => {
    it('should import settings on effects init and complete', done => {
      // tslint:disable:use-async-synchronisation-in-tests
      const testComplete$ = new Subject<void>();

      actions$ = of({ type: ROOT_EFFECTS_INIT });

      testComplete$.pipe(take(2)).subscribe({ complete: done });

      effects.setInitialRestEndpoint$.subscribe(
        data => {
          expect(data.type).toEqual(ConfigurationActionTypes.ApplyConfiguration);
          testComplete$.next();
        },
        fail,
        () => testComplete$.next()
      );
      // tslint:enable:use-async-synchronisation-in-tests
    });
  });

  describe('routerWatch$', () => {
    it('should set imported channel to state', fakeAsync(() => {
      router.navigateByUrl('/home;channel=site');
      tick(500);
      expect(location.path()).toMatchInlineSnapshot(`"/home;channel=site"`);
      expect(getRestEndpoint(store$.state)).toMatchInlineSnapshot(`"http://localhost:4200/INTERSHOP/rest/WFS/site/-"`);
    }));

    it('should set imported channel and application to state', fakeAsync(() => {
      router.navigateByUrl('/home;channel=site;application=app');
      tick(500);
      expect(location.path()).toMatchInlineSnapshot(`"/home;channel=site;application=app"`);
      expect(getRestEndpoint(store$.state)).toMatchInlineSnapshot(
        `"http://localhost:4200/INTERSHOP/rest/WFS/site/app"`
      );
    }));

    it('should set imported channel to state and redirect if requested', fakeAsync(() => {
      router.navigateByUrl('/home;channel=site;redirect=1');
      tick(500);
      expect(location.path()).toMatchInlineSnapshot(`"/home"`);
      expect(getRestEndpoint(store$.state)).toMatchInlineSnapshot(`"http://localhost:4200/INTERSHOP/rest/WFS/site/-"`);
    }));

    it('should preserve query parameters when redirecting', fakeAsync(() => {
      router.navigateByUrl('/home;channel=site;redirect=1?foo=bar&test=hello');
      tick(500);
      expect(location.path()).toMatchInlineSnapshot(`"/home?foo=bar&test=hello"`);
      expect(getRestEndpoint(store$.state)).toMatchInlineSnapshot(`"http://localhost:4200/INTERSHOP/rest/WFS/site/-"`);
    }));

    it('should set imported features to state', fakeAsync(() => {
      router.navigateByUrl('/home;features=a,b,c;redirect=1');
      tick(500);
      expect(location.path()).toMatchInlineSnapshot(`"/home"`);
      expect(getFeatures(store$.state)).toIncludeAllMembers(['a', 'b', 'c']);
    }));

    it('should unset features if "none" was provided', fakeAsync(() => {
      store$.dispatch(new ApplyConfiguration({ features: ['a', 'b', 'c'] }));
      router.navigateByUrl('/home;features=none;redirect=1');
      tick(500);
      expect(location.path()).toMatchInlineSnapshot(`"/home"`);
      expect(getFeatures(store$.state)).toBeEmpty();
    }));

    it('should not set features if "default" was provided', fakeAsync(() => {
      store$.dispatch(new ApplyConfiguration({ features: ['a', 'b', 'c'] }));
      router.navigateByUrl('/home;features=default;redirect=1');
      tick(500);
      expect(location.path()).toMatchInlineSnapshot(`"/home"`);
      expect(getFeatures(store$.state)).toIncludeAllMembers(['a', 'b', 'c']);
    }));

    it('should set imported locale to state', fakeAsync(() => {
      router.navigateByUrl('/home;redirect=1;lang=de_DE');
      tick(500);
      expect(location.path()).toMatchInlineSnapshot(`"/home"`);
      expect(getCurrentLocale(store$.state).lang).toEqual('de_DE');
    }));
  });
});