import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

import './MovieCard.css';

import '../components/MoviesGrid.css';

const imageUrl = import.meta.env.VITE_IMG;

const MovieCard = ({ movie, showLink = true }) => {
	const navigate = useNavigate();

	const handleClick = (e) => {
		navigate(`/movie/${movie.id}`);
		console.log('esta a funcionar');
	};

	return (
		<div className="movie-card">
			{movie.poster_path && movie.poster_path ? (
				<img
					src={imageUrl + movie.poster_path}
					alt={movie.title}
					onClick={handleClick}
				/>
			) : (
				<img alt="no image displayed" className="no-image-card" />
			)}

			<h2>{movie.title || movie.name}</h2>
			<p>
				<FaStar /> {movie.vote_average}
			</p>
			{showLink && <Link to={`/movie/${movie.id}`}>More Details</Link>}
		</div>
	);
};

export default MovieCard;
