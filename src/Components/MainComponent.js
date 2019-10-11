import React, { Component } from 'react';
import { DISHES } from '../shared/dishes'
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import {Switch, Route, Redirect} from 'react-router-dom';

class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES,
            // selectedDish: null
        };
    }

    // onDishSelect(dishId) {
    //     this.setState({
    //         selectedDish: dishId
    //     });
    // }

    render() {

        const HomePage = () => {
            return(
                <Home />
            );
        }

        return (
            <div className='App'>
                <Header />
                {/* <MenuComponent dishes={this.state.dishes} 
                    onClick={(dishId) => this.onDishSelect(dishId)}/>
                <DishdetailComponent dish={this.state.dishes.filter((dish)=> dish.id === this.state.selectedDish)[0]} /> */}
                    <Switch>
                        <Route path="/home" component = {HomePage} />
                        <Route exact path="/menu" component = {() => <MenuComponent dishes={this.state.dishes}/>} />
                        <Redirect to="/home" />
                    </Switch>
                <Footer />
            </div >

        );
    }
}

export default MainComponent;