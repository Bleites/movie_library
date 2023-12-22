import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { BiCameraMovie, BiSearchAlt2 } from 'react-icons/bi';
import './Navbar.css';

const Navbar = () => {
	const [search, setsearch] = useState('');
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(search);

		if (!search) return;

		navigate(`/search?q=${search}`);
		setsearch('');
	};

	const eventHandlerOnEnter = () => {
		// console.log('mostra');
		const btnMovies = document.getElementById('dropdown-movies');
		// console.log(btnMovies);
		btnMovies.style.display = 'block';
		eventHandlerOnLeaveSeries();
	};

	const eventHandlerOnEnterSeries = () => {
		// console.log('mostra');
		const btnSeries = document.getElementById('dropdown-series');
		// console.log(btnSeries);
		btnSeries.style.display = 'block';
		eventHandlerOnLeave();
	};

	const eventHandlerOnLeave = () => {
		// console.log('não mostra');
		const btnMovies = document.getElementById('dropdown-movies');
		// console.log(btnMovies);
		btnMovies.style.display = 'none';
	};

	const eventHandlerOnLeaveSeries = () => {
		// console.log('não mostra');
		const btnSeries = document.getElementById('dropdown-series');
		// console.log(btnSeries);
		btnSeries.style.display = 'none';
	};

	return (
		<nav id="navbar">
			<h2>
				<Link to="/">
					<BiCameraMovie /> MoviesLib
				</Link>
			</h2>

			<div className="dopdown-container">
				<div className="dropdown" onMouseOver={eventHandlerOnEnter}>
					<button className="dropbtn">Movies</button>
					<div
						className="dropdown-content"
						id="dropdown-movies"
						onMouseLeave={eventHandlerOnLeave}
					>
						<span>
							<Link to="/">TopRated</Link>
						</span>

						<span>
							<Link to="/upcomingmovies">Upcoming</Link>
						</span>

						<span>
							<Link to="/popularmovies">Popular</Link>
						</span>
					</div>
				</div>

				<div className="dropdown" onMouseEnter={eventHandlerOnEnterSeries}>
					<button className="dropbtn">Series</button>
					<div
						className="dropdown-content"
						id="dropdown-series"
						onMouseLeave={eventHandlerOnLeaveSeries}
					>
						<span>
							<Link to="/topratedseries">
								<p>TopRated</p>
							</Link>
						</span>

						<span>
							<Link to="/onairseries">
								<p>On-Air</p>
							</Link>
						</span>

						<span>
							<Link to="/popularseries">
								<p>Popular</p>
							</Link>
						</span>
					</div>
				</div>
			</div>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Search your favorite"
					onChange={(e) => setsearch(e.target.value)}
					value={search}
				/>
				<button type="submit">
					<BiSearchAlt2 />
				</button>
			</form>
		</nav>
	);
};

export default Navbar;
