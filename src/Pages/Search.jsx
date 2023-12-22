import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import SerieCard from './SerieCard';

import './../components/MoviesGrid.css';

// const searchUrl = import.meta.env.VITE_SEARCH; //movie search .env
// const searchUrlTv = import.meta.env.VITE_SEARCH_TV; //tv search .env
const searchAllUrl = import.meta.env.VITE_SEARCH_ALL; //supostamente search em todos .env
const apiKey = import.meta.env.VITE_API_KEY;

const Search = () => {
	const [moviesPage, setMoviesPage] = useState(1);
	const [totalPages, setTotalPages] = useState([]);
	const [searchParams] = useSearchParams();
	const [movies, setMovies] = useState([]);

	const query = searchParams.get('q');

	const getSearchedMovies = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		setMovies(data.results);
		setTotalPages(data.total_pages);
	};

	useEffect(() => {
		const getSearchedUrl = `${searchAllUrl}?${apiKey}&query=${query}&page=${moviesPage}`;
		// const getSearchedUrlTv = `${searchUrlTv}?${apiKey}&query=${query}&page=${moviesPage}`;

		getSearchedMovies(getSearchedUrl);
	}, [query, moviesPage]);

	console.log(totalPages);

	return (
		<div className="container">
			<h2 className="title">
				Searched Movies: <span className="query-text">{query}</span>
			</h2>
			{/* <div className="movies-container">
				{movies.length === 0 && <p>Loading....</p>}
				{movies.length > 0 &&
					movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
			</div>			 */}
			<div className="movies-container">
				{movies.length === 0 && <p>Loading....</p>}
				{movies.length > 0 &&
					movies.map((movie) =>
						movie.media_type !== 'tv' ? (
							<MovieCard key={movie.id} movie={movie} />
						) : (
							<SerieCard key={movie.id} serie={movie} />
						)
					)}
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
			{console.log(movies)}
		</div>
	);
};

export default Search;
