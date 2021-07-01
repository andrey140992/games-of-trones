import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';
import Col from 'reactstrap/lib/Col';


const Details = styled.div`
    
    /* background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px; */
    border-radius: 0.25rem ;
    opacity: 0.5;


`;

const HeaderDetails = styled.h4`
    color: #fff;    
    margin-bottom: 20px;
    text-align: center;
    
`;

const SelectError = styled.span`
    color: #fff;
    text-align: center;
    font-size: 26px;
`;





const Field = ({item, field, label}) => {
    return(

        <li className="list-group-item d-flex justify-content-between">
                <span className="term">{label}</span>
                <span>{item[field]}</span>
        </li>

    )

}

export {
    Field
}

export default class ItemDetails extends Component {

    gotService = new GotService();

    state ={
        item: null,
        error: false
    }

    componentDidMount() {
        this.updateItem();
    }

   

    componentDidUpdate(prevProps){
        if(this.props.itemId !== prevProps.itemId){
            this.updateItem();
        }
    }

    onItemDetailsLoaded = (item) => {
        this.setState({
            item 
            
        })
    }

    updateItem() {
        const {getData, itemId} = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item
                })
            })
    }

    onError(){
        this.setState({
            item: null,
            error:true
        })
    }

    
    render() {

        if(!this.state.item && this.state.error){
            return <ErrorMessage/>
        }else if (!this.state.item){
           return <SelectError className='select error'>Please select item in the list </SelectError>
        }
       const {item} = this.state;
       const {name} = item;

        if(!item) {
            return <Spinner/>
        }

        return (
            <Details >
                <HeaderDetails>{name}</HeaderDetails>
                <Col >
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item});
                        })
                    }
                </Col>
            </Details>
        );
    }
}