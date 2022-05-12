import MoviesDAO from "../DAO/moviesDao.js";
export default class MoviesController {
  static async apiGetMovies(req, res, next) {
    const moviesPerPage = req.query.moviesPerPage
      ? parseInt(req.query.moviesPerPage)
      : 20;
    const page = req.query.page ? parseInt(req.query.page) : 0;
    let filters = {};
    if (req.query.rated) {
      filters.rated = req.query.rated;
    } else {
      if (req.query.title) {
        filters.title = req.query.title;
      }
    }
    const { moviesList, totalNummovies } = await MoviesDAO.getMovies({
      moviesPerPage,
      filters,
      page,
    });
    let respone = {
      name: "19521522 Võ Hồng Hòa",
      movies: moviesList,
      page: page,
      filters: filters,
      entries_per_page: moviesPerPage,
      total_result: totalNummovies,
    };
    res.json(respone);
  }
  static async apiGetMovieById(req, res, next) {
    try {
      let id = req.params.id || {};

      let movie = await MoviesDAO.getMovieById(id);
      console.log(movie);
      if (!movie) {
        res.status(404).json({ error: "not found" });
        return;
      }
      res.json(movie);
    } catch (e) {
      console.log(`api ${e}`);
      res.status(500).json({ error: e.error });
    }
  }
  static async apiGetRatings(req, res, next) {
    try {
      let propertytypes = await MoviesDAO.getRatings();
      res.json(propertytypes);
    } catch (e) {
      console.log(`api ${e}`);
      res.status(500).json({ error: e.error });
    }
  }
}
