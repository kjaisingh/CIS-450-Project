import React from 'react';
import PageNavbar from './PageNavbar';
import BestMoviesRow from './BestMoviesRow';
import '../style/BestMovies.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css"
import { Slider } from "shards-react";

export default class BestMovies extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedBorough: "Manhattan",
			selectedParty: 1,
			selectedBar: 1,

			selectedDecade: "",
			selectedGenre: "",
			decades: [],
			genres: [],
			movies: []
		};

		this.handleBoroughChange = this.handleBoroughChange.bind(this);
		this.handlePartySlide = this.handlePartySlide.bind(this);
		this.handleBarSlide = this.handleBarSlide.bind(this);
		this.submitPreferences = this.submitPreferences.bind(this);
	};

	/* ---- Q3a (Best Movies) ---- */
	handleBoroughChange(e) {
		this.setState({
			selectedBorough: e.target.value
		});
		// console.log(e.target.value);
	};

	handlePartySlide(e) {
		this.setState({
			selectedParty: Math.round(parseFloat(e[0]))
		});
		// console.log(Math.round(parseFloat(e[0])));
	}

	handleBarSlide(e) {
		this.setState({
			selectedBar: Math.round(parseFloat(e[0]))
		});
		// console.log(Math.round(parseFloat(e[0])));
	}

	/* ---- Q3b (Best Movies) ---- */
	submitPreferences() {
		fetch("http://localhost:8081/nycparty/" + this.state.selectedBorough + "/" + this.state.selectedParty 
				+ "/" + this.state.selectedBar,
        {
          method: 'GET' // The type of HTTP request.
        }).then(res => {
          // Convert the response data to a JSON.
          return res.json();
        }, err => {
          // Print the error if there is one.
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
          // Map each keyword in this.state.keywords to an HTML element:
          // A button which triggers the showMovies function for each keyword.
          const movieDivs = movieList.map((movieObj, i) =>
            <BestMoviesRow movie = {movieObj}/> 
          );
          // Set the state of the keywords list to the value returned by the HTTP response from the server.
          this.setState({
            movies: movieDivs
          });
        }, err => {
          // Print the error if there is one.
          console.log(err);
        });
	};

	render() {
		return (
			<div className="BestMovies">
				<PageNavbar active="bestgenres" />
				<br />
				<div className="container bestmovies-container">
					<div className="jumbotron">
						<div className="h5">Party Filter</div>

						<div>
							<header>Borough</header>
							<input type="radio" value="Manhattan" name="Size"  onChange = {this.handleBoroughChange} checked = {this.state.selectedBorough === "Manhattan" ? "checked": null} /> Manhattan
							<input type="radio" value="Brooklyn" name="Size"  onChange = {this.handleBoroughChange} checked = {this.state.selectedBorough === "Brooklyn" ? "checked": null} /> Brooklyn
							<input type="radio" value="Queens" name="Size"  onChange = {this.handleBoroughChange} checked = {this.state.selectedBorough === "Queens" ? "checked": null} /> Queens
							<input type="radio" value="Staten Island" name="Size"  onChange = {this.handleBoroughChange} checked = {this.state.selectedBorough === "Staten Island" ? "checked": null}/> Staten Island
							<input type="radio" value="Bronx" name="Size"  onChange = {this.handleBoroughChange} checked = {this.state.selectedBorough === "Bronx" ? "checked": null}/> Bronx
						</div>
						<br />

						<div>
							<header>Party Intensity</header>
							<Slider pips={{ mode: "steps", stepped: true, density: 5 }}
									step={1} onSlide={this.handlePartySlide} connect={[true, false]} 
									start={[this.state.selectedParty]} range={{ min: 1, max: 5 }}
							/>
						</div>
						<br />

						<div>
							<header>Bar Intensity</header>
							<Slider pips={{ mode: "steps", stepped: true, density: 5 }}
									step={1} onSlide={this.handleBarSlide} connect={[true, false]} 
									start={[this.state.selectedBar]} range={{ min: 1, max: 5 }}
							/>
						</div>
						<br />

						<div>
							<button className="submit-btn" id="submitBtn" onClick={this.submitPreferences}>Submit</button>
						</div>
					</div>
				
					<div className="jumbotron">
						<div className="movies-container">
							<div className="movie">
								<div className="header"><strong>ID</strong></div>
								<div className="header"><strong>Previous Price</strong></div>
								<div className="header"><strong>Rating</strong></div>
								<div className="header"><strong>Number of Reviews</strong></div>
								<div className="header"><strong>About</strong></div>
							</div>
							<div className="movies-container" id="results">
								{this.state.movies}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
};
