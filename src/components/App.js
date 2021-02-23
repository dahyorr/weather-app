import React from 'react'
import {connect} from 'react-redux'
import {fetchData} from "../actions";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import Footer from "./Footer";
import WeatherCard from "./WeatherCard";

class App extends React.Component{
    componentDidMount() {
        const cities = JSON.parse(localStorage.getItem('cities'))
        if (cities){
            cities.map((city)=>this.props.fetchData(city))
        }
    }

    renderError = () =>{
        if(this.props.error){
            return <p className="text-center text-error">{this.props.error}</p>
        }
        return null
    }

    renderContent = () => {
        return this.props.data.map(data => <WeatherCard data={data} key={data.name}/>)
    }

    render() {
        return (
            <div>
                <Nav/>
                <div className={'container'} style={{paddingBottom: '3rem'}}>
                    <SearchBar/>
                    {this.renderError()}
                    {this.renderContent()}
                </div>
                <div className={'footer-spacing'}> </div>
                <Footer/>
            </div>
        )
    }


}
const mapStateToProps = state =>{
    return{
        error: state.error,
        data: Object.values(state.weatherData)
    }
}

export default connect(mapStateToProps, {fetchData})(App)
