import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import './MovieCard.css';

import '../components/MoviesGrid.css';

const imageUrl = import.meta.env.VITE_IMG;

const SerieCard = ({ serie, showLink = true }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		navigate(`/serie/${serie.id}`);
		console.log('esta a funcionar');
	};

	return (
		<div className="movie-card">
			{serie.poster_path && serie.poster_path ? (
				<img
					src={imageUrl + serie.poster_path}
					alt={serie.title}
					onClick={handleClick}
				/>
			) : (
				<img alt="no image displayed" className="no-image-card" />
			)}

			<h2>{serie.title || serie.name}</h2>
			<p>
				<FaStar /> {serie.vote_average}
			</p>
			{showLink && <Link to={`/serie/${serie.id}`}>More Details</Link>}
		</div>
	);
};

export default SerieCard;
