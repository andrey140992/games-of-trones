import React, { Component } from 'react';
import ErrorMessage from '../errorMessage';
import ItemList from '../itemList';
import GotService from '../../services/gotService';
import { withRouter } from 'react-router';



 class BooksPage extends Component{
    gotService= new GotService();

    state={
       
        error: false
        
    }

  

    componentDidCatch() {
        this.setState({
            error: true
        })
    }

    render(){

        if(this.state.error){
            return <ErrorMessage/>
        }

      

        return (

            <ItemList
            onItemSelected={(itemId) => {
                this.props.history.push(itemId)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({name, numberOfPages}) => `${name} (${numberOfPages})`} />

        
            )
    
        }

}

export default withRouter(BooksPage);