import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Home from './Pages/Home.jsx';

import './index.css';
import UpcomingMovies from './Pages/UpcomingMovies.jsx';
import PopularMovies from './Pages/PopularMovies.jsx';
import Movie from './components/Movie.jsx';
import Serie from './components/Serie.jsx';
import Search from './Pages/Search.jsx';
import SeriesAiringToday from './Pages/SeriesAiringToday.jsx';
import SeriesTopRated from './Pages/SeriesTopRated.jsx';
import SeriesPopular from './Pages/SeriesPopular.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route path="/" element={<Home />} />
					<Route path="movie/:id" element={<Movie />} />
					<Route path="serie/:id" element={<Serie />} />
					<Route path="search" element={<Search />} />
					<Route path="/upcomingmovies" element={<UpcomingMovies />}></Route>
					<Route path="/popularmovies" element={<PopularMovies />}></Route>
					<Route path="/topratedseries" element={<SeriesTopRated />}></Route>
					<Route path="/onairseries" element={<SeriesAiringToday />}></Route>
					<Route path="/popularseries" element={<SeriesPopular />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
