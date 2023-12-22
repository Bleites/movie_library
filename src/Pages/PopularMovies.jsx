import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

import './../components/MoviesGrid.css';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const PopularMovies = () => {
	const [totalPages, setTotalPages] = useState([]);
	const [moviesPage, setMoviesPage] = useState(1);
	const [popularMovies, setPopularMovies] = useState([]);

	const getPopularMovies = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		setPopularMovies(data.results);
		setTotalPages(data.total_pages);
	};
	useEffect(() => {
		const popularMovies = `${moviesURL}popular?${apiKey}&page=${moviesPage}`;

		getPopularMovies(popularMovies);
	}, [moviesPage]);
	return (
		<div className="container">
			<h2 className="title">Popular Movies:</h2>
			<div className="movies-container">
				{popularMovies.length === 0 && <p>Carregando...</p>}
				{popularMovies.length > 0 &&
					popularMovies.map((movie) => (
						<MovieCard key={movie.id} movie={movie} />
					))}
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

export default PopularMovies;
