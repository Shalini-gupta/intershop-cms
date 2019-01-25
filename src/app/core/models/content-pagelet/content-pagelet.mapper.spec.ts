import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { configurationReducer } from 'ish-core/store/configuration/configuration.reducer';

import { ContentPageletData } from './content-pagelet.interface';
import { ContentPageletMapper } from './content-pagelet.mapper';

describe('Content Pagelet Mapper', () => {
  let contentPageletMapper: ContentPageletMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(
          { configuration: configurationReducer },
          {
            initialState: {
              configuration: {
                baseURL: 'http://www.example.org',
                serverStatic: 'static',
                channel: 'channel',
              },
            },
          }
        ),
      ],
    });

    contentPageletMapper = TestBed.get(ContentPageletMapper);
  });

  it('should throw on empty input', () => {
    expect(() => contentPageletMapper.fromData(undefined)).toThrowError('falsy input');
  });

  it('should convert simple pagelet to single array instance', () => {
    const input: ContentPageletData = {
      id: 'pagelet',
      displayName: 'pagelet',
      definitionQualifiedName: 'domain-pagelet',
      configurationParameters: {
        key: {
          definitionQualifiedName: 'quali',
          value: 'test',
        },
      },
    };

    const result = contentPageletMapper.fromData(input);
    expect(result).toMatchSnapshot();
  });

  it('should convert pagelet with slots to single array instance', () => {
    const input: ContentPageletData = {
      id: 'pagelet',
      displayName: 'pagelet',
      definitionQualifiedName: 'domain-pagelet',
      configurationParameters: {
        key: {
          definitionQualifiedName: 'quali',
          value: 'test',
        },
      },
      slots: {
        slot1: {
          definitionQualifiedName: 'quali-slot',
          pagelets: [],
        },
      },
    };

    const result = contentPageletMapper.fromData(input);
    expect(result).toMatchSnapshot();
  });

  it('should convert pagelet with slots and additional pagelets to multi array instance', () => {
    const input: ContentPageletData = {
      id: 'pagelet',
      displayName: 'pagelet',
      definitionQualifiedName: 'domain-pagelet',
      configurationParameters: {
        key: {
          definitionQualifiedName: 'quali',
          value: 'test',
        },
      },
      slots: {
        slot1: {
          definitionQualifiedName: 'quali-slot',
          pagelets: [
            {
              id: 'pagelet-nested',
              definitionQualifiedName: 'fq',
              displayName: 'name-nested',
            },
          ],
        },
        slot2: {
          definitionQualifiedName: 'quali-slot',
          pagelets: [
            {
              id: 'pagelet-nested2',
              definitionQualifiedName: 'domain-pagelet',
              displayName: 'name1',
              configurationParameters: {
                key1: {
                  definitionQualifiedName: 'fq',
                  value: 'test-key1',
                },
              },
              slots: {
                slot11: {
                  definitionQualifiedName: 'fq-2',
                  pagelets: [
                    {
                      id: 'pagelet-deeply-nested',
                      definitionQualifiedName: 'fq',
                      displayName: 'name-nested',
                      configurationParameters: {
                        key3: {
                          definitionQualifiedName: 'fq',
                          value: '1',
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
          configurationParameters: {
            key1: {
              definitionQualifiedName: 'name1',
              value: 'hallo',
            },
            key2: {
              definitionQualifiedName: 'name2',
              value: ['hallo', 'welt'],
            },
          },
        },
      },
    };

    const result = contentPageletMapper.fromData(input);

    expect(result).toHaveLength(4);
    expect(result.map(p => p.id)).toIncludeAllMembers([
      'pagelet',
      'pagelet-nested',
      'pagelet-nested2',
      'pagelet-deeply-nested',
    ]);
    expect(result).toMatchSnapshot();
  });

  it('should have special handling for image pagelet configuration parmeters', () => {
    const input = {
      definitionQualifiedName: 'app_sf_responsive_cm:component.common.image.pagelet2-Component',
      displayName: 'Brand Image 5',
      id: 'cmp_brandImage_5',
      configurationParameters: {
        Image: {
          value: 'inSPIRED-inTRONICS-b2c-responsive:/brands/adata.jpg',
          definitionQualifiedName: 'app_sf_responsive_cm:component.common.image.pagelet2-Component-Image',
        },
      },
    };

    expect(contentPageletMapper.fromData(input)[0]).toHaveProperty(
      'configurationParameters.Image',
      'http://www.example.org/static/channel/-/inSPIRED-inTRONICS-b2c-responsive/-/brands/adata.jpg'
    );
  });
});