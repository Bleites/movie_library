import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

import './../components/MoviesGrid.css';
// import { useParams } from 'react-router-dom';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const Home = () => {
	// const { page } = useParams();
	const [totalPages, setTotalPages] = useState([]);
	const [moviesPage, setMoviesPage] = useState(1);
	const [topMovies, setTopMovies] = useState([]);

	const getTopRatedMovies = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		setTopMovies(data.results);
		setTotalPages(data.total_pages);
	};

	useEffect(() => {
		let topRatedUrl = `${moviesURL}top_rated?${apiKey}&page=${moviesPage}`;

		getTopRatedMovies(topRatedUrl);
		// console.log(moviesPage);
	}, [moviesPage]);

	return (
		<div className="container">
			<h2 className="title">Top Rated Movies:</h2>
			<div className="movies-container">
				{topMovies.length === 0 && <p>Carregando...</p>}
				{topMovies.length > 0 &&
					topMovies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
			</div>
			<div className="btn-container">
				{moviesPage && moviesPage <= 1 ? (
					<p></p>
				) : (
					<button
						className="btn"
						onClick={() =>
							setMoviesPage((prev) => (prev >= 2 ? (prev -= 1) : (prev -= 0)))
						}
					>
						Previous
					</button>
				)}

				<p>Page {moviesPage}</p>

				{moviesPage && moviesPage === totalPages ? (
					<p></p>
				) : (
					<button
						className="btn"
						onClick={() => setMoviesPage((prev) => (prev += 1))}
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
};

export default Home;
