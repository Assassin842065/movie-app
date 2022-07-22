import React, { Component } from 'react'
import { movies } from './getMovies'
export default class banner extends Component {
    render() {
        let movie = movies.results;
        return (
            <>
                {
                    movie.length === 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div className="card banner-card">
                            <img src={`https://image.tmdb.org/t/p/original${movie[0].backdrop_path}`} alt={movie[0].title} className="movieBanner" />
                            <h5 className="card-title movieTitle">{movie[0].original_title}</h5>
                            <p className="card-text movieText">{movie[0].overview}</p>
                        </div>
                }
            </>
        )
    }
}
