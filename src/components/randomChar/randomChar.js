import React, {Component} from 'react';
import styled from 'styled-components';
import GotService from '../../services/gotService';
import Spinner from  '../spinner';
import ErrorMessage from '../errorMessage';

const Block = styled.div`

    background-color: #fff;
    padding: 25px 25px 15px 25px;
    margin-bottom: 40px;
    border-radius: 0.25rem;
    opacity: 0.5;

    img{
        
        width: 100%
    }

`;

const BlockHeader = styled.h4`

    margin-bottom: 20px;
    text-align: center;


`;

const Term = styled.span`
    font-weight: bold;
`;

export default class RandomChar extends Component {

 

    gotService = new GotService();
     state= {
        char: {},
        loading: true,
        error: false
     }

     componentDidMount(){
        this.updateChar();
        this.timerId = setInterval(this.updateChar, 1500);
     }

     componentWillUnmount(){
        clearInterval(this.timerId);
     }

     onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
     }

     onError = (err) => {
         this.setState({
             error: true,
             loading: false
         })
     }


     updateChar = () => {
        const id = Math.floor(Math.random()*140 + 25);
        this.gotService.getCharacter (id)
        .then(this.onCharLoaded)
        .catch(this.onError);
     }

    render() {
      
        const {char,  loading, error  } = this.state;

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null ;
        const content = !(loading || error) ? <Viev char={char}/> : null ;

        

        return (
            <Block>
                {spinner}
                {errorMessage}
                {content}
            </Block>
        );
    }
}

const Viev = ({char}) => {
    const {name, gender, born, died, culture} = char;
    return (
        <>
             <BlockHeader>Random char:{name}</BlockHeader>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <Term>Gender</Term>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term>Born</Term>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term>Died </Term>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <Term>Culture </Term>
                        <span>{culture}</span>
                    </li>
                </ul> 
        </>
    )
}
