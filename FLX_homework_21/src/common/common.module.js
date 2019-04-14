import angular from 'angular';
import { MoviesComponent } from "./components/movies/movies.component";
import { FreshMovieDirective } from './directives/fresh-movie.directive';
import { MoviesService } from "./services/movies.service";

import { MovieInfoComponent } from "./components/movie-info/movie-info.component";

const MODULE_NAME = 'common';
const MODULE_IMPORTS = [];

export const CommonModule = angular
  .module(MODULE_NAME, MODULE_IMPORTS)
  .component(MoviesComponent.selector, MoviesComponent)
  .directive(FreshMovieDirective().name, FreshMovieDirective)
  .service(MoviesService.serviceName, MoviesService)
  .component(MovieInfoComponent.selector, MovieInfoComponent)
  .name;
