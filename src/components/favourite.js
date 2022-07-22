import React, { Component } from 'react'

export default class favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: 'All-genre',
            movie: [],
            currText: '',
            limit: 5,
            currPage: 1,
        }
    }
    componentDidMount() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let data = JSON.parse(localStorage.getItem("movie") || "[]");
        let temp = [];
        data.forEach(movieObj => {
            if (!temp.includes((genreids[movieObj.genre_ids[0]]))) {
                temp.push(genreids[movieObj.genre_ids[0]]);
            }
        });
        temp.unshift("All-genre");
        this.setState({
            movie: [...data],
            genres: [...temp],
        })
    }
    handleGenre = (genre) => {
        this.setState({
            currgen: genre,
        })
    }
    handleSearch = (e) => {
        this.setState({
            currText: e.target.value,
        })
    }
    sortPopularityDesc = () => {
        let temp = this.state.movie;
        temp.sort((ObjA, ObjB) => {
            return ObjB.popularity - ObjA.popularity;
        })
        this.setState({
            movie: [...temp],
        })
    }

    sortPopularityAsc = () => {
        let temp = this.state.movie;
        temp.sort((ObjA, ObjB) => {
            return ObjA.popularity - ObjB.popularity;
        })
        this.setState({
            movie: [...temp],
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.movie;
        temp.sort((ObjA, ObjB) => {
            return ObjB.vote_average - ObjA.vote_average;
        })
        this.setState({
            movie: [...temp],
        })
    }

    sortRatingAsc = () => {
        let temp = this.state.movie;
        temp.sort((ObjA, ObjB) => {
            return ObjA.vote_average - ObjB.vote_average;
        })
        this.setState({
            movie: [...temp],
        })
    }

    handlePageChange=(page)=>{
        this.setState({
            currPage: page,
        })
    }

    handleDelete=(id)=>{
        let newarr = [];
        newarr = this.state.movie.filter((movieObj)=>movieObj.id!==id)
        this.setState({
            movie:[...newarr]
        })
        localStorage.setItem("movie",JSON.stringify(newarr))
    }

    render() {
        let genreids = {
            28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
            27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
        };
        let filterArr = [];
        if (this.state.currgen === 'All-genre') {
            filterArr = [...this.state.movie];
        } else {
            filterArr = this.state.movie.filter((movieObj) => {
                return genreids[movieObj.genre_ids[0]] === this.state.currgen;
            })
        }

        filterArr = filterArr.filter((movieObj) => {
            let title = movieObj.original_title;
            title = title.toLowerCase();
            return title.includes(this.state.currText.toLowerCase());
        })
        let maxLen=filterArr.length;
        let pages = Math.ceil(filterArr.length / this.state.limit);
        let pagesarr = [];
        for (let i = 1; i <= pages; i++) {
            pagesarr.push(i);
        }
        console.log(filterArr);
        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit;
        filterArr = filterArr.slice(si, ei);
        console.log(si,ei);
        return (
            <>
                <div className='row favourite-table'>
                    <div className='col-3'>
                        <ul class="list-group table-genere">
                            {
                                this.state.genres.map((genre) => (
                                    genre === this.state.currgen ?
                                        <li class="list-group-item" style={{ background: '#3f51b5', color: 'white', fontWeight: 'bold' }} onClick={() => this.handleGenre(genre)}>{genre}</li> :
                                        <li class="list-group-item" style={{ background: 'white', color: '#3f51b5' }} onClick={() => this.handleGenre(genre)}>{genre}</li>
                                ))
                            }
                        </ul>
                    </div>
                    <div className='col-9 table-movies'>
                        <div className='row'>
                            <input type='text' className='input-group-text col' placeholder='search' value={this.state.currText
                            } onChange={this.handleSearch}></input>
                            <input type='Number' min='1' max={maxLen} className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e) => this.setState({ limit: Number(e.target.value) })} />
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortPopularityDesc} />Popularity<i class="fas fa-sort-down" onClick={this.sortPopularityAsc}></i></th>
                                    <th scope="col"><i class="fas fa-sort-up" onClick={this.sortRatingDesc}></i>Rating<i class="fas fa-sort-down" onClick={this.sortRatingAsc}></i></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterArr.map((movieObj) => (
                                        <tr>
                                            <td><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} /> {movieObj.original_title}</td>
                                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                                            <td>{movieObj.popularity}</td>
                                            <td>{movieObj.vote_average}</td>
                                            <td><button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                {
                                    pagesarr.map((page) => (
                                        <li class="page-item"><a class="page-link" onClick={() => this.handlePageChange(page)}>{page}</a></li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        )
    }
}
