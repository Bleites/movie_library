import { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

import './../components/MoviesGrid.css';
import { useParams } from 'react-router-dom';

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

const UpcomingMovies = () => {
	const [totalPages, setTotalPages] = useState([]);
	const [moviesPage, setMoviesPage] = useState(1);
	const [upcomingMovies, setUpcomingMovies] = useState([]);
	let { moviesPage2 } = useParams();
	moviesPage2 = moviesPage;
	console.log(moviesPage2);

	const getUpcomingMovies = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		setUpcomingMovies(data.results);
		setTotalPages(data.total_pages);
	};
	useEffect(() => {
		const upcomingMovies = `${moviesURL}upcoming?${apiKey}&page=${moviesPage}`;

		getUpcomingMovies(upcomingMovies);
	}, [moviesPage]);

	console.log(moviesPage);

	return (
		<div className="container">
			<h2 className="title">Upcoming Movies:</h2>
			<div className="movies-container">
				{upcomingMovies.length === 0 && <p>Carregando...</p>}
				{upcomingMovies.length > 0 &&
					upcomingMovies.map((movie) => (
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

export default UpcomingMovies;
