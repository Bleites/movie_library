import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// import Navbar from '../components/Navbar';
import SerieCard from '../Pages/SerieCard';
import './Movie.css';

import {
	BsGraphUp,
	BsHourglassSplit,
	BsFillFileEarmarkTextFill,
} from 'react-icons/bs';

const seriesURL = import.meta.env.VITE_API_TV;
const apiKey = import.meta.env.VITE_API_KEY;

const Serie = () => {
	const { id } = useParams();
	const [serie, setSerie] = useState(null);

	const getclickedMovie = async (url) => {
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		setSerie(data);
	};

	// const formatCurrency = (number) => {
	// 	return number.toLocaleString('en-US', {
	// 		style: 'currency',
	// 		currency: 'USD',
	// 	});
	// };

	useEffect(() => {
		const detailedSerie = `${seriesURL}${id}?${apiKey}`;

		getclickedMovie(detailedSerie);
	}, []);

	return (
		<div className="movie-page">
			{serie && (
				<>
					<SerieCard serie={serie} showLink={false} />
					<p className="tagline">{serie.tagline}</p>
					<div className="info">
						<h3>
							<BsGraphUp /> Popularity:
						</h3>
						<p>{serie.popularity}</p>
					</div>
					<div className="info">
						<h3>
							<BsHourglassSplit /> Seasons:
						</h3>
						<p>Total: {serie.number_of_seasons}</p>
					</div>
					<div className="info">
						<h3>
							<BsHourglassSplit /> Episodes:
						</h3>
						<p>Total: {serie.number_of_episodes}</p>
					</div>
					<div className="info" id="info">
						<h3>
							<BsFillFileEarmarkTextFill /> Description:
						</h3>
						<p>{serie.overview}</p>
					</div>
				</>
			)}
		</div>
	);
};

export default Serie;
