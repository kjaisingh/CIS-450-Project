import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import KeywordButton from './KeywordButton';
import DashboardMovieRow from './DashboardMovieRow';
import ListingRow from './ListingRow';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keywords: [],
      movies: [],
      loudListings: [],
      quietListings: []
    };

    this.showMovies = this.showMovies.bind(this);
  };

  // React function that is called when the page load.
  componentDidMount() {
    fetch("http://localhost:8081/keywords",
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(keywordsList => {
      if (!keywordsList) return;
      const keywordsDivs = keywordsList.map((keywordObj, i) =>
        <KeywordButton 
          id={"button-" + keywordObj.neighbourhood} 
          onClick={() => this.showMovies(keywordObj.neighbourhood)} 
          keyword={keywordObj.neighbourhood} 
        /> 
      );
      this.setState({
        keywords: keywordsDivs
      });
    }, err => {
      console.log(err);
    });

    fetch("http://localhost:8081/loudListings",
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(resultsList => {
      if (!resultsList) return;
      const resultsDiv = resultsList.map((resultObj, i) =>
        <ListingRow movie = {resultObj}
        />  
      );
      this.setState({
        loudListings: resultsDiv
      });
    }, err => {
      console.log(err);
    });

    fetch("http://localhost:8081/quietListings",
    {
      method: 'GET'
    }).then(res => {
      return res.json();
    }, err => {
      console.log(err);
    }).then(resultsList => {
      if (!resultsList) return;
      const resultsDiv = resultsList.map((resultObj, i) =>
        <ListingRow movie = {resultObj}
        />  
      );
      this.setState({
        quietListings: resultsDiv
      });
    }, err => {
      console.log(err);
    });
  };

  /* ---- Q1b (Dashboard) ---- */
  showMovies(keyword) {
      console.log(keyword);
      fetch("http://localhost:8081/keywords/" + keyword,
      {
          method: 'GET'
      }).then(res => {
        return res.json();
      }, err => {
        console.log(err);
      }).then(movieList => {
        if (!movieList) return;
        const movieDivs = movieList.map((movieObj, i) =>
          <DashboardMovieRow movie = {movieObj}
          /> 
        );
        console.log(movieList);
        this.setState({
          movies: movieDivs
        });
      }, err => {
        console.log(err);
      });
  };

  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="home" />
        <br />

        <div class="container">
						<div class="row">
							<div class="col-md-6 col-sm-6">
							<div class="jumbotron">
								<header>Loud Favourites</header>
								<div className="movies-container">
                  <div className="movie">
										<div className="header"><strong>Listing</strong></div>
										<div className="header"><strong>Neighbourhood</strong></div>
									</div>
									<div className="loud-results" id="results">
										{this.state.loudListings}
									</div>
								</div>
							</div>
							</div>

							<div class="col-md-6 col-sm-6">
							<div class="jumbotron">
								<header>Quiet Favourites</header>
								<div className="movies-container">
                  <div className="movie">
										<div className="header"><strong>Listing</strong></div>
										<div className="header"><strong>Neighbourhood</strong></div>
									</div>		
									<div className="quiet-results" id="results">
										{this.state.quietListings}
									</div>
								</div>
							</div>
							</div>
						</div>
				</div>
        <br />

        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Manhattan Neighbourhoods</div>
            <div className="keywords-container">
              {this.state.keywords}
            </div>
          </div>
          <br />

          <div className="jumbotron">
            <div className="movies-container">
              <div className="movies-header">
                <div className="header-lg"><strong>Name</strong></div>
                <div className="header"><strong>Room Type</strong></div>
                <div className="header"><strong>Price</strong></div>
              </div>
              <div className="results-container" id="results">
                {this.state.movies}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};
