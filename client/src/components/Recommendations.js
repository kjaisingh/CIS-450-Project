import React from 'react';
import PageNavbar from './PageNavbar';
import RecommendationsRow from './RecommendationsRow';
import AirbnbPriceRow from './AirbnbPriceRow';
import FindReviewRow from './FindReviewRow';
import AggFindNeighbourhood from './AggFindNeighbourhood';
import '../style/Recommendations.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "shards-ui/dist/css/shards.min.css"
import { Slider } from "shards-react";
import Footer from "./Footer";
import { Button } from "shards-react";
import { FormInput } from "shards-react";
import { FormCheckbox } from "shards-react";
import { FormRadio } from "shards-react";

export default class Recommendations extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			movieName: "",
			recMovies: [],
			numberOfPeople: 1,
			superHostNeeded: "Yes",
			amenityVerification: "Yes",
			prefPrice:0,
			selectedFilter: "minimum_nights",
			selectedBorough_T10: "Manhattan",
			decades: [],
			selectedBorough_topHosts: "Manhattan",
			hostResults: [],
			reviewResults: [],
			refrigerator: false,
			bathtub: false,
			heating: false,
			smokeAlarm: false,
			wifiPresent: false,
			TVPresent: false,
			kitchenPresent: false,
			washerPresent: false,
			recentReviewBorough: "Manhattan",
			filterResults: [],
			x: "two",
			y: "three"
		};

		this.handleMovieNameChange = this.handleMovieNameChange.bind(this);
		this.submitMovie = this.submitMovie.bind(this);
		this.handleSizeChange = this.handleSizeChange.bind(this);
		this.handleSuperHostChange = this.handleSuperHostChange.bind(this);
		this.handleSlide = this.handleSlide.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.handleBoroughT10Change = this.handleBoroughT10Change.bind(this);
		this.handleBoroughTopHostsChange = this.handleBoroughTopHostsChange.bind(this);
		this.handleAmenityVerificationChange = this.handleAmenityVerificationChange.bind(this);
		this.handleFridgeChange = this.handleFridgeChange.bind(this);
		this.handleTVChange = this.handleTVChange.bind(this);
		this.handleWifiChange = this.handleWifiChange.bind(this);
		this.handleKitchenChange = this.handleKitchenChange.bind(this);
		this.submitFilterAndBorough = this.submitFilterAndBorough.bind(this);
		this.submitBoroughToHosts = this.submitBoroughToHosts.bind(this);
		this.handleReviewBoroughChange = this.handleReviewBoroughChange.bind(this);
		this.submitReviews = this.submitReviews.bind(this);
	};

	handleKitchenChange(e9) {
		this.setState({
			kitchenPresent: e9.target.checked
		})
	}

	handleTVChange(e9) {
		this.setState({
			TVPresent: e9.target.checked
		})
	}

	handleWifiChange(e9){
		this.setState({
			wifiPresent: e9.target.checked
		})
	}

	handleFridgeChange(e8) {
		this.setState({
			refrigerator : e8.target.checked
		})
	}

	handleReviewBoroughChange(e9) {
		this.setState({
			recentReviewBorough: e9.target.value
		})
	}

	handleAmenityVerificationChange(e7) {
		this.setState({
			amenityVerification : e7.target.value
		})
	}

	handleBoroughT10Change(e5) {
		this.setState({
			selectedBorough_T10 : e5.target.value
		})
	}

	handleBoroughTopHostsChange(e6) {
		this.setState({
			selectedBorough_topHosts : e6.target.value
		})
	}

	handleSuperHostChange(e2) {
		this.setState({
			superHostNeeded : e2.target.value
		})
	}

	handleFilterChange(e4) {
		this.setState({
			selectedFilter : e4.target.value
		})
	}

	handleSlide(e3) {
		this.setState({
			prefPrice: Math.round(parseFloat(e3[0]))
		});
	  }

	handleSizeChange(event) {
		this.setState({numberOfPeople: event.target.value
		})    
	  }

	handleMovieNameChange(e) {
		this.setState({
			movieName: e.target.value
		});
	};

	componentDidMount() {
		fetch("http://localhost:8081/find",
		{
		  method: 'GET'
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(decadesList => {
		  if (!decadesList) return;
		  const decadeDivs = decadesList.map((movieObj, i) =>
			<option className="decadesOption" value={movieObj.neighbourhood}>{movieObj.neighbourhood}</option>
          );
		  this.setState({
			decades: decadeDivs
		  });
		});
	}

	submitMovie() {
		const l = document.querySelector(".hello");

		if (this.state.movieName === "") {
			this.setState({
				movieName: " "
			  });
		}
        fetch("http://localhost:8081/find/" + this.state.movieName + "/" + this.state.numberOfPeople + "/" + this.state.superHostNeeded + "/" + this.state.prefPrice + "/" + this.state.wifiPresent + "/" + this.state.TVPresent + "/" + this.state.kitchenPresent + "/" + this.state.refrigerator,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
          if(movieList.length === 0) {
          	console.log("error");
          	l.style.opacity = "1";
          } else {
          	l.style.opacity = "0";
          }
          const recommendedDivs = movieList.map((movieObj, i) =>
            <RecommendationsRow movie = {movieObj}
            /> 
          );
          this.setState({
            recMovies: recommendedDivs
          });
        });

	};

	submitFilterAndBorough() {
		fetch("http://localhost:8081/find/" + this.state.selectedFilter + "/" + this.state.selectedBorough_T10,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
          const movieDivs = movieList.map((movieObj, i) =>
            <AirbnbPriceRow movie = {movieObj}/> 
          );
          this.setState({
            filterResults: movieDivs
          });
        }, err => {
          console.log(err);
        });
	};



	submitBoroughToHosts() {
		fetch("http://localhost:8081/find/" + this.state.selectedBorough_topHosts,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
          const movieDivs = movieList.map((movieObj, i) =>
            <FindReviewRow movie = {movieObj}/> 
          );
          this.setState({
            hostResults: movieDivs
          });
        }, err => {
          console.log(err);
        });
	};



	submitReviews() {
		fetch("http://localhost:8081/find/" + this.state.recentReviewBorough + "/" +  this.state.x + "/" +  this.state.y,
        {
          method: 'GET'
        }).then(res => {
          return res.json();
        }, err => {
          console.log(err);
        }).then(movieList => {
          if (!movieList) return;
          const movieDivs = movieList.map((movieObj, i) =>
            <AggFindNeighbourhood movie = {movieObj}/> 
          );
          this.setState({
            reviewResults: movieDivs
          });
        }, err => {
          console.log(err);
        });
	};

	
	render() {
		return (
			<div className="Recommendations">
				<PageNavbar active="Find an Airbnb" />
				<br />
				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">T-10 Filter</div>
						<br></br>

						<div>
							<header><strong>Filter</strong></header>
							<FormRadio inline value="minimum_nights" name="Filter"  onChange = {this.handleFilterChange} checked = {this.state.selectedFilter === "minimum_nights" ? "checked": null}>
            					Minimum Nights
         		 			</FormRadio>
							<FormRadio inline value="price" name="Filter"  onChange = {this.handleFilterChange} checked = {this.state.numberOfPeople === "price" ? "checked": null}>
            					Price
         		 			</FormRadio>
							<FormRadio inline value="number_of_reviews" name="Filter"  onChange = {this.handleFilterChange} checked = {this.state.numberOfPeople === "number_of_reviews" ? "checked": null}>
            					Number of Reviews
         		 			</FormRadio>
						</div>

						<div className="dropdown-container">
							<strong>Borough</strong>:
							<br></br>
							<select value={this.state.selectedBorough_T10} onChange={this.handleBoroughT10Change} className="decadesOptions" id="decadesDropdown1">
								{this.state.decades}
							</select>
							<Button pill theme="secondary" size="sm" className="submit-btn" id="submitT10Filter" onClick={this.submitFilterAndBorough}>Submit</Button>
						</div>


						<div className="header-container">
							<div className="headers">
								<div className="header"><strong>Name</strong></div>
								<div className="header"><strong>Room Type</strong></div>
								<div className="header"><strong>Price</strong></div>
								<div className="header"><strong>Number of Reviews</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.filterResults}
						</div>

					</div>
				</div>

				<br />
				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Recommendations</div>
						<br></br>
						<div className="input-container">
							<FormInput width="100" type='text' placeholder="Enter Description Keyword" required="required" value={this.state.movieName} onChange={this.handleMovieNameChange} id="movieName" className="movie-input"/>
						</div>
						<p class="hello">Please enter a search term.</p>
						<div>
							<header><strong>Number of People</strong></header>
							<FormRadio inline value="1" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 1 ? "checked": null}>
            					1
         		 			</FormRadio>
							<FormRadio inline value="2" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 2 ? "checked": null}>
            					2
         		 			</FormRadio>
							<FormRadio inline value="3" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 3 ? "checked": null}>
            					3
         		 			</FormRadio>
							<FormRadio inline value="4" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 4 ? "checked": null}>
            					4
         		 			</FormRadio>
							<FormRadio inline value="5" name="Size"  onChange = {this.handleSizeChange} checked = {this.state.numberOfPeople === 5 ? "checked": null}>
            					5
         		 			</FormRadio>
						</div>

						<div>
							<header><strong>Superhost Required</strong></header>
							<FormRadio inline value="Yes" name="SuperHost" onChange = {this.handleSuperHostChange} checked = {this.state.superHostNeeded === "Yes" ? "checked": null}>
            					Yes
         		 			</FormRadio>
							<FormRadio inline value="No" name="SuperHost" onChange = {this.handleSuperHostChange} checked = {this.state.superHostNeeded === "No" ? "checked": null}>
            					No
         		 			</FormRadio>
						</div>

						<div>
						<strong>Amenities</strong>
						</div>

						<div>
							<FormCheckbox inline name="refrigerator" checked = {this.state.refrigerator} onChange = {this.handleFridgeChange}>
								Refrigerator
							</FormCheckbox>

							<FormCheckbox inline name="wifi" checked = {this.state.wifiPresent} onChange = {this.handleWifiChange}>
								Wifi
							</FormCheckbox>

							<FormCheckbox inline name="TV" checked = {this.state.TVPresent} onChange = {this.handleTVChange}>
								Television
							</FormCheckbox>

							<FormCheckbox inline name="Kitchen" checked = {this.state.KitchenPresent} onChange = {this.handleKitchenChange}>
								Kitchen
							</FormCheckbox>	
						</div>

						<div>
							<header><strong>Price Limit</strong></header>
							<Slider pips={{ mode: "steps", stepped: true, density: 10 }}
									step={50} onSlide={this.handleSlide} connect={[true, false]} 
									start={[this.state.prefPrice]} range={{ min: 0, max: 500 }}
							/>
						</div>

						<div>
						<Button pill theme="secondary" size="sm" id="submitSearch" className="submit-btn" onClick={this.submitMovie}>Submit</Button>
						</div>

						<div className="header-container">
							<div className="headers">
								<div className="header"><strong>Name</strong></div>
								<div className="header"><strong>Room Type</strong></div>
								<div className="header"><strong>Price</strong></div>
								<div className="header"><strong>Host Name</strong></div>
							</div>
						</div>
						<div className="results-container" id="results">
							{this.state.recMovies}
						</div>
					</div>
				</div>

				<div class="container recommendations-container">
						<div class="row">

							<div class="col-md-6 col-sm-6">
							<div class="jumbotron">
								<header className="h6">Top Hosts by Reviews</header>
								<div className="movies-container">
									<div className="dropdown-container">
										<strong>Borough</strong>
										<br></br> <select value = {this.state.selectedBorough_topHosts} onChange={this.handleBoroughTopHostsChange} className="decadesOptions" id="decadesDropdown2">
											{this.state.decades}
										</select>
										<Button pill theme="secondary" size="sm" className="submit-btn" id="submitHostFilter" onClick={this.submitBoroughToHosts}>Submit</Button>
									</div>									
									<div className="movie">
										<div className="header"><strong>Name</strong></div>
										<div className="header"><strong>Avg Rating</strong></div>
									</div>
									<div className="movies-container" id="results">
										{this.state.hostResults}
									</div>
								</div>
							</div>
							</div>
							
							<div class="col-md-6 col-sm-6">
							<div class="jumbotron">
								<header className="h6">Neighbourhood Availability</header>
								<div className="movies-container">
									<div className="dropdown-container">
										<strong>Borough</strong>
										<br></br> <select value={this.state.recentReviewBorough} onChange={this.handleReviewBoroughChange} className="decadesOptions" id="decadesDropdown3">
											{this.state.decades}
										</select>
										<Button pill theme="secondary" size="sm" className="submit-btn" id="submitReviewBorough" onClick={this.submitReviews}>Submit</Button>
									</div>
									
									<div className="movie">
										<div className="header"><strong>Borough</strong></div>
										<div className="header"><strong>Airbnb Number</strong></div>
									</div>
									<div className="movies-container" id="results">
										{this.state.reviewResults}
									</div>
								</div>
							</div>
							</div>

						</div>

					</div>
					<div>
						<Footer />
					</div>
			</div>
			

		);
	};
};