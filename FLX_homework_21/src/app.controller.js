import { MoviesService } from "./common/services/movies.service";

export class AppController {
  constructor(moviesService) {
    this.movies = [];
    this.moviesService = moviesService;
  }

  $onInit() {
    this.moviesService.getAllMovies().then((result) => {
      this.movies = result;
    });

  }
}

AppController.$inject = [MoviesService.serviceName];
