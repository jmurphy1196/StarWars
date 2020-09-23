import { Component, ChangeDetectionStrategy } from '@angular/core';

import { combineLatest, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Starship } from 'src/app/shared/models';
import { FavoriteService } from '../../core/services/favorite.service';
import { StarshipService } from '../../core/services/starship.service';

@Component({
  templateUrl: './starship-list.component.html',
  styleUrls: ['./starship-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarshipListComponent {

  pageTitle = 'Starship List';
  errorMessage = '';
  filter = '';
  page = 1;
  size = 5;

  vm$ = combineLatest([this.starshipService.starships$])
    .pipe(
      map(([starships]) => ({
        starships
      })),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );


  addFavorite(starship: Starship) {
    this.favorites.addFavoriteStarship(starship);
  }

  removeFavorite(starship: Starship) {
    this.favorites.removeFavoriteStarship(starship);
  }

  constructor(private starshipService: StarshipService, private favorites: FavoriteService) {

  }
}
