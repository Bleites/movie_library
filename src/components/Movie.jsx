import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import Navbar from '../components/Navbar';
import MovieCard from '../Pages/MovieCard';
import './Movie.css';

import {
	BsGraphUp,
	BsWallet2,
	BsHourglassSplit,
	BsFillFileEarmarkTextFill,
} from 'react-icons/bs';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Movie = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	console.log(id);

	const getclickedMovie = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		setMovie(data);
	};

	const formatCurrency = (number) => {
		return number.toLocaleString('en-US', {
			style: 'currency',
			currency: 'USD',
		});
	};

	useEffect(() => {
		const detailedMovie = `${moviesURL}${id}?${apiKey}`;

		getclickedMovie(detailedMovie);
	}, []);

	return (
		<div className="movie-page">
			{movie && (
				<>
					<MovieCard movie={movie} showLink={false} />
					<p className="tagline">{movie.tagline}</p>
					<div className="info">
						<h3>
							<BsWallet2 /> Budget:
						</h3>
						<p>{formatCurrency(movie.budget)}</p>
					</div>
					<div className="info">
						<h3>
							<BsGraphUp /> Revenue:
						</h3>
						<p>{formatCurrency(movie.revenue)}$</p>
					</div>
					<div className="info">
						<h3>
							<BsHourglassSplit /> Run Time:
						</h3>
						<p>{movie.runtime}min.</p>
					</div>
					<div className="info" id="info">
						<h3>
							<BsFillFileEarmarkTextFill /> Description:
						</h3>
						<p>{movie.overview}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default Movie;
