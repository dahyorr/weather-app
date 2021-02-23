import React from 'react'
import cityIcon from '../icons/city.svg'
import addIcon from '../icons/add.svg'
import {connect} from 'react-redux'
import {fetchData, createError} from "../actions";

class SearchBar extends React.Component {
    state = {city: ''}

    onFormSubmit = event =>{
        event.preventDefault()
        if (this.state.city){
            this.props.fetchData(this.state.city)
        }
        else{
            this.props.createError('You must enter a city')
        }
        this.setState({city: ''})
    }

    onInputChange = event =>{
        this.setState({city: event.target.value})
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="flex-box input-container my-1">
                <div className="icon-boxes flex-box">
                    <img src={cityIcon} alt=""/>
                </div>
                <label htmlFor="city-input"/>
                <input type="text" name="city-input" className="city-input" placeholder="Enter a City" id="city-input"
                       required="" autoComplete={'off'} value={this.state.city} onChange={this.onInputChange}/>
                <button className="icon-boxes flex-box">
                    <img src={addIcon} alt="Add"/>
                </button>
            </form>
        )
    }
}
export default connect(null, {fetchData, createError})(SearchBar)
