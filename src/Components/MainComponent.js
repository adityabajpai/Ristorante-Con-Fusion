import React, { Component } from 'react';
import MenuComponent from './MenuComponent';
import DishDetail from './DishdetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';

const mapStateToProps = state=>{
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => {dispatch(fetchDishes())},
    resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
    fetchComments: () => {dispatch(fetchComments())},
    fetchPromos: () => {dispatch(fetchPromos())},
    fetchLeaders: () => { dispatch(fetchLeaders()) },
    postFeedback: (feedback) => dispatch(postFeedback(feedback))
});

class MainComponent extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    // onDishSelect(dishId) {
    //     this.setState({
    //         selectedDish: dishId
    //     });
    // }


    render() {

        const HomePage = () => {
            return(
                // extract all dishes where featured is true and filter will return an array hence index zero is mentioned
                <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMsg = {this.props.dishes.errmsg}
                promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMsg = {this.props.promotions.errmsg}
                leader={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}/>
            );
        }

        const DishWithId = ({match}) => {
            return(
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
                  isLoading={this.props.dishes.isLoading}
                  errMsg = {this.props.dishes.errmsg}
                  comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                  commentsErrMsg = {this.props.comments.errmsg}
                  postComment={this.props.postComment} />
            );
          };

        return (
            <div className='App'>
                <Header />
                {/* <MenuComponent dishes={this.state.dishes} 
                    onClick={(dishId) => this.onDishSelect(dishId)}/>
                <DishdetailComponent dish={this.state.dishes.filter((dish)=> dish.id === this.state.selectedDish)[0]} /> */}
                    <TransitionGroup>
                        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                            <Switch>
                                <Route path="/home" component = {HomePage} />
                                <Route exact path="/menu" component = {() => <MenuComponent dishes={this.props.dishes}/>} />
                                <Route path = '/menu/:dishId' component={DishWithId}/>
                                <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders} />} />
                                <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}/>
                                <Redirect to="/home" />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                <Footer />
            </div >

        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));