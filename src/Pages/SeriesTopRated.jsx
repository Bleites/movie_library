import { useState, useEffect } from 'react';
import MovieCard from './SerieCard';

import './../components/MoviesGrid.css';

const seriesURL = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

const SeriesTopRated = () => {
	const [totalPages, setTotalPages] = useState([]);
	const [seriesPage, setSeriesPage] = useState(1);
	const [topRatedSeries, setTopRatedSeries] = useState([]);

	const getTopRatedSeries = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		setTopRatedSeries(data.results);
		setTotalPages(data.total_pages);
	};

	useEffect(() => {
		let topRatedSeries = `${seriesURL}top_rated?${apiKey}&page=${seriesPage}`;

		getTopRatedSeries(topRatedSeries);
		// console.log(moviesPage);
	}, [seriesPage]);

	return (
		<div className="container">
			<h2 className="title">Top Rated Series:</h2>
			<div className="movies-container">
				{topRatedSeries.length === 0 && <p>Carregando...</p>}
				{topRatedSeries.length > 0 &&
					topRatedSeries.map((serie) => (
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

export default SeriesTopRated;
