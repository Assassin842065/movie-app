import React, { Component } from 'react'
import axios from 'axios';

export default class Trend extends Component {
    constructor() {
        super();
        this.state = {
            hover: '',
            parr: [1],
            currPage: 1,
            movie: [],
            favourites: [],
        }
    }
    async componentDidMount(){
        const res =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cabce345382a7631bfbac001134c6869&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        this.handleFavouritesState();
        this.setState({
            movie: [...data.results],
        })
    }
    async changeMovies(){
        const res =await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=cabce345382a7631bfbac001134c6869&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        this.setState({
            movie: [...data.results],
        })
    }
    handleRight=()=>{
        let narr=[...this.state.parr];
        if(this.state.currPage===this.state.parr.length){
            narr=[];
            for(let i=1;i<=this.state.parr.length+1;i++){
                narr.push(i);
            }
        }
        this.setState({
            currPage: this.state.currPage+1,
            parr: [...narr],
        },this.changeMovies)
    }
    handleLeft=()=>{
        if(this.state.currPage!==1){
            this.setState({
                currPage:this.state.currPage-1,
            },this.changeMovies)
        }
    }
    handleClick=(val)=>{
        if(this.state.currPage!==val){
            this.setState({
                currPage: val,
            },this.changeMovies)
        }
    }
    handleFavourites=(movieObj)=>{
        let oldData=JSON.parse(localStorage.getItem("movie") || "[]");
        if(this.state.favourites.includes(movieObj.id)){
            oldData=oldData.filter((m)=>{
                return m.id!==movieObj.id;
            })
        }else{
            oldData.push(movieObj);
        }
        
        localStorage.setItem("movie",JSON.stringify(oldData));
        this.handleFavouritesState();
    }
    handleFavouritesState=()=>{
        let oldData = JSON.parse(localStorage.getItem("movie") || "[]")
        let temp = oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }
    render() {
        return (
            <>
                {
                    this.state.movie.length === 0 ?
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div> :
                        <div>
                            <h1 style={{ color: '#3d3d3d' }} className='text-center'>Trending</h1>
                            <div className='movie-cont'>
                                {
                                    this.state.movie.map((movieObj) => (
                                        <div className="card movieCard" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                            <img className="card-img-top movieImg" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} />
                                            <h5 className="card-title textImg">{movieObj.original_title}</h5>
                                            {
                                                this.state.hover === movieObj.id &&
                                                <a className="btn btn-primary butImg" onClick={()=>this.handleFavourites(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to favourites"}</a>
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                }
                <div className='moviePaging'>
                    <nav aria-label="Page navigation example ">
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" onClick={this.handleLeft}>Previous</a></li>
                            {
                                this.state.parr.map((value) => (
                                    <li class="page-item"><a class="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                                ))
                            }
                            <li class="page-item"><a class="page-link" onClick={this.handleRight}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </>
        )
    }
}
