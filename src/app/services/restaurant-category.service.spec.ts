import { TestBed } from '@angular/core/testing';

import { RestaurantCategoryService } from './restaurant-category.service';

describe('RestaurantCategoryService', () => {
  let service: RestaurantCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
