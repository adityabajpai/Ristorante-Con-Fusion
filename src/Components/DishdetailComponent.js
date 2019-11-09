import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';

function RenderDish({dish}){
        if (dish != null) {
            return (
                <div className='col-12 col-md-5 m-1'>
                    <Card>
                        <CardImg src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle style={{color:"#000"}}>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        }
        else {
            return (<div></div>)
        }
    }

    function RenderComments({comments, addComment, dishId}) {
        if (comments == null) {
            return (<div></div>)
        }
        const comment = comments.map(cmnt => {
            return (
                <li key={cmnt.id}>
                    <p>{cmnt.comment}</p>
                    <p>-- {cmnt.author}, {cmnt.date}
                    </p>
                </li>
            )
        })
        return (
            <div className='col-12 col-md-5 m-1'>
                <h4> Comments </h4>
                <ul className='list-unstyled'>
                    {comment}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
    }

    
    const DishDetail = (props) => {
        if(props.isLoading){
          return(
            <div className="container">
              <div className="row">
                <Loading />
              </div>
            </div>
          )
        }
        else if(props.errmsg){
          return(
            <div className="container">
              <div className="row">
                <h4>{props.errmsg}</h4>
              </div>
            </div>
          )
        }
        const dish = props.dish
        if (dish == null) {
            return (<div></div>)
        }
        // const dishItem = this.renderDish(dish)
        // const commentItem = this.renderComments(dish.comments)
        return (
            <div className="container">
                <div className='row' style={{alignItems:"center"}}>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr/>
                    </div>
                    <RenderDish dish = {props.dish} />
                    <RenderComments comments = {props.comments}
                      addComment={props.addComment}
                      dishId={props.dish.id} />
                </div>
            </div>
        )
    }

export default DishDetail;

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isModalOpen: false
      };
      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
  
    handleSubmit(values) {
      this.toggleModal();
      alert("Current state "+JSON.stringify(values));
      this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
    }
  
    render() {
      return (
        <div>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil" /> Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={this.handleSubmit}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={12}>
                    Rating
                  </Label>
                  <Col md={{ size: 12 }}>
                    <Control.select model=".rating" name="rating" className="form-control">
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={12}>
                    Your Name
                  </Label>
                  <Col md={12}>
                    <Control.text model=".author" id="author" name="author" 
                        placeholder="Your Name" className="form-control"
                        validators={{
                            required, minLength: minLength(3), maxLength: maxLength(15)
                      }}
                    />
                    <Errors
                      className="text-danger" model=".author" show="touched" 
                        messages={{
                            required: "Required",
                            minLength: "Must be greater than 2 characters",
                            maxLength: "Must be 15 characters or less"
                        }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment" md={12}>
                    Comment
                  </Label>
                  <Col md={12}>
                    <Control.textarea model=".comment" id="comment" name="comment" rows={5} className="form-control"
                    validators={{
                        required
                    }}/>
                    <Errors
                        className="text-danger" model=".comment" show="touched"
                        messages={{
                            required: 'Required'
                        }}
                    />
                  </Col>
                </Row>
                <Button type="submit" value="submit" color="primary">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }