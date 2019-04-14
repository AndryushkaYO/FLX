export class MoviesService {
  constructor($http) {
    this.$http = $http;
  }

  findMovieById(id) {
     return this.$http.get(`https://reactjs-cdp.herokuapp.com/movies/${id}`)
       .then(res => res.data)
  }

  getAllMovies() {
    return this.$http.get(`https://reactjs-cdp.herokuapp.com/movies?limit=50`)
      .then(res =>  res.data.data)
  }
}

MoviesService.serviceName = 'moviesService';
MoviesService.$inject = ['$http'];