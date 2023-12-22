import { useState, useEffect } from 'react';
import MovieCard from './SerieCard';

import './../components/MoviesGrid.css';

const seriesURL = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

const SeriesPopular = () => {
	const [totalPages, setTotalPages] = useState([]);
	const [seriesPage, setSeriesPage] = useState(1);
	const [popularSeries, setPopularSeries] = useState([]);

	const getPopularSeries = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		setPopularSeries(data.results);
		setTotalPages(data.total_pages);
	};

	useEffect(() => {
		const popularSeries = `${seriesURL}popular?${apiKey}&page=${seriesPage}`;

		getPopularSeries(popularSeries);
		// console.log(moviesPage);
	}, [seriesPage]);

	return (
		<div className="container">
			<h2 className="title">Popular Series:</h2>
			<div className="movies-container">
				{popularSeries.length === 0 && <p>Carregando...</p>}
				{popularSeries.length > 0 &&
					popularSeries.map((serie) => (
						<MovieCard key={serie.id} serie={serie} />
					))}
			</div>
			<div className="btn-container">
				{seriesPage && seriesPage <= 1 ? (
					<p></p>
				) : (
					<button
						className="btn"
						onClick={() =>
							setSeriesPage((prev) => (prev >= 2 ? (prev -= 1) : (prev -= 0)))
						}
					>
						Previous
					</button>
				)}

				<p>Page {seriesPage}</p>

				{seriesPage && seriesPage === totalPages ? (
					<p></p>
				) : (
					<button
						className="btn"
						onClick={() => setSeriesPage((prev) => (prev += 1))}
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
};

export default SeriesPopular;
