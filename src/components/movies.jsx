import React, { Component } from 'react';
import MoviesTable from "./moviesTable";
import { getMovies,deleteMovie } from '../services/movieService';
import Pagination from "./common/pagination";
import {paginate} from "../Utilities/paginate";
import {getGenres} from "../services/genreService";
import {toast} from "react-toastify";
import ListGroup from "./common/listGroup";
import _ from 'lodash';
import {Link} from "react-router-dom";
import SearchBox from './searchbox';

class Movies extends Component {
    state = { 
        movies:[],
        pageSize:4,
        genres:[],
        searchQuery:"",
        selectedGenre:null,
        currentPage:1,
        sortColumn:{path:'title',order:'asc'}
    }
    
    async componentDidMount(){
        const {data} =await getGenres()
        const genres=[{_id: '',name:'All Genres'}, ...data]
        const {data:movies}=await getMovies()
        this.setState({movies,genres});
    }
    
    handleDelete=async movie=>{
     const originalMovies=this.state.movies;
     const movies=originalMovies.filter(m=>m._id!==movie._id)
     this.setState({movies})
     try{
        await deleteMovie(movie._id);
     }
     catch(ex){
         if(ex.response && ex.response.status===404)
            toast.error("This Movie is already deleted.");
         this.setState({movies:originalMovies})   

     }
    };
    
    handleLike=movie=>{
        const movies=[...this.state.movies];
        const index=movies.indexOf(movie);
        movies[index]={...movies[index]};
        movies[index].liked=!movies[index].liked;
        this.setState({movies});
    }
    
    handlePageChange=page=>{
     this.setState({currentPage:page})
    }
    
    handleGenreSelect=genre=>{
        
        this.setState({selectedGenre:genre,searchQuery:"",currentPage:1});
    }
   
    handleSort=sortColumn=>{
      
        this.setState({sortColumn});
    }

    handleSearch=query=>{
        this.setState({searchQuery:query, selectedGenre:null,currentPage:1});
    };
    
    getPageData=()=>{
        const {
            pageSize,
            currentPage,
            sortColumn,
            selectedGenre,
            searchQuery,
            movies:allMovies
        } = this.state

        let filtered=allMovies;
        if(searchQuery)
          filtered=allMovies.filter(
              m=>m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
            );
        
        else if(selectedGenre && selectedGenre._id)
           filtered=allMovies.filter(m=>m.genre._id===selectedGenre._id);
        const sorted = _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);   
        
        const movies=paginate(sorted, currentPage, pageSize);

        return {totalCount:filtered.length,data:movies}
    }
    
    

    

    render() { 
    const {length:count}=this.state.movies;
    const {searchQuery}=this.state; 
    const {pageSize,
        currentPage,
        sortColumn,
       
    }=this.state
    
    if (count===0)return <p>There are no movies in the database.</p>  
    
    const {totalCount,data:movies}=this.getPageData();  
   
    return (
            
        <div className="row">
            
        <div className="col-2">
            
        <ListGroup 
            
        items={this.state.genres}
            
        selectedItem={this.state.selectedGenre}
            
        onItemSelect={this.handleGenreSelect} />
            
        </div>
            
        <div className="col">
            
        <Link
        to="/movies/new"
        className="btn btn-primary"
        style={{margin:20}}>
        New Movie
        </Link>
        
        <p>Showing {totalCount} movies in the database.</p>
        
        <SearchBox value={searchQuery} onChange={this.handleSearch} />
        
        <MoviesTable 
        
        movies={movies} 
        
        onLike={this.handleLike} 
        
        onDelete={this.handleDelete} 
        
        onSort={this.handleSort}

        sortColumn={sortColumn}

        />        
        
        <Pagination 
        
        itemsCount={totalCount}
        
        pageSize={pageSize} 
        
        currentPage={currentPage}
        
        onPageChange={this.handlePageChange}/>
            
        </div>
            
     </div>
     ); 
  }
}
 
export default Movies ;