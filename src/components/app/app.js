import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import styled from 'styled-components';
import ErrorMessage from '../errorMessage';
import { BooksPage, CharacterPage, HousePage, BooksItem, NotFound } from '../pages/';
import GotService from '../../services/gotService';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './index.css';




const ToggleButton = styled.button`
    font-size: 1em;
    margin-bottom: 2em;
    background-color: darkgrey;
    padding: 0.25em 1em;
    border-radius: 3px;
`;

const H = styled.h1`
color: white;
text-align: center;
`;






export default class App extends Component {

    gotService = new GotService();
    
    state={
        showRandomChar: true,
        error: false,
        
    }

    toggleRandomChar= () => {
        this.setState((state)=>{
            return {
                showRandomChar: !state.showRandomChar
            }
        })
    }

   

    render(){
        if(this.state.error){
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;

        return (
            
              <Router>
                <div className="app">
                    <Container>
                        <Header />
                    </Container>
                    <Container>
                        <Row>
                            <Col lg={{size: 5, offset: 0}}>
                                {char}
                            <ToggleButton
                                onClick={this.toggleRandomChar} >Toggle random character</ToggleButton>
                            </Col>
                        </Row>
                            <Switch>
                            
                                    <Route path='/' exact component={()=> <H>Welcome to Games Of Thrones</H>}/>
                                    <Route path='/characters' exact component = {CharacterPage}/>
                                    <Route path='/houses' exact component = {HousePage}/>
                                    <Route path='/books' exact component = {BooksPage}/>
                                    <Route path='/books/:id'  render={
                                        ({match}) => {
                                        const {id} = match.params;

                                        return <BooksItem  bookId={id} />}
                                    }/>
                                    <Route  component ={NotFound}/>
                            </Switch>
                    </Container>
                    </div>
              </Router>
             
            );
            
        
        
        
            
        }
      
 };

