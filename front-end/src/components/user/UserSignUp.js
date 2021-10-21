import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UserPage from './UserPage';


class UserSignUp extends Component {

    constructor(props){
        super(props);
        this.state =  { userEmail: '',
                        userFirstName: '',
                        userLastName: '',
                        userPassword: '',
                        isValid:false
                      };
    }

    handleUserEmailChange = (e) => {
        this.setState({ userEmail: e.target.value });
    }
    handleUserFirstNameChange = (e) => {
        this.setState({ userFirstName: e.target.value });
    }
    handleUserLastNameChange = (e) => {
        this.setState({ userLastName: e.target.value });
    }
    handleUserPasswordChange = (e) => {
        this.setState({ userPassword: e.target.value });
    }

    createUser=(event)=>{
        event.preventDefault();

        const postData = {
            userEmail: this.state.userEmail,
            userFirstName: this.state.userFirstName,
            userLastName: this.state.userLastName,
            userPassword: this.state.userPassword
          }
          axios.post('http://ec2-54-212-242-149.us-west-2.compute.amazonaws.com:8080/user/addNew', postData).then(response => response.data)
          .then((data) => {
            console.log(data)

            this.setState({
                isValid: true
            })
          });

     }

    render() {
        return (<React.Fragment>
        
            <Container fluid>
            <Row>
             <Col><div >
             <Card bg={'Primary'.toLowerCase()}
                border="light"
                text={'Primary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2">
              <Card.Body><h5>User View</h5></Card.Body>
            </Card>
           </div></Col>
        </Row>
         {this.state.isValid===false?(
             <Row >
             <Col>
             <Card style={{ width: '30rem' }}>
                 <Card.Body>
                 <form onSubmit={this.createUser}>
                 <Form.Group as={Row} className="mb-5" controlId="1">
                     <Form.Label column sm="6"><div><h5>Create account</h5></div></Form.Label>
                     <Form.Control type="email" placeholder="Email" value={this.state.userEmail} onChange={this.handleUserEmailChange}/>
                     <Form.Control type="text" placeholder="First Name" value={this.state.userFirstName} onChange={this.handleUserFirstNameChange}/>
                     <Form.Control type="text" placeholder="Last Name" value={this.state.userLastName} onChange={this.handleUserLastNameChange}/>
                     <Form.Control type="password" placeholder="Password" value={this.state.userPassword} onChange={this.handleUserPasswordChange}/>
                 </Form.Group>
                 <Button type="submit" variant="primary" size="md" active>Sign Up</Button>
                 </form>
                 </Card.Body>
             </Card>
             </Col>
         </Row>
         ):(
            <UserPage myPropEmail={this.state.userEmail} 
                          myPropFname={this.state.userFirstName}
                          myPropLname={this.state.userLastName}></UserPage>
         )}
            
            </Container>
            </React.Fragment>
            )
        }
}

export default UserSignUp;