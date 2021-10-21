import React, { Component } from 'react'
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import UserPage from './UserPage';

class UserLogin extends Component {

  constructor(props){
    super(props);
    this.state =  { userEmail: '',
                    userPassword: '',
                    userFirstName: '',
                    userLastName: '',
                    isValid:false};
}

handleUserEmailChange = (e) => {
    this.setState({ userEmail: e.target.value });
}

handleUserPasswordChange = (e) => {
    this.setState({ userPassword: e.target.value });
}

loginUser=(event)=>{
    event.preventDefault();

    const postData = {
      userEmail: this.state.userEmail,
      userPassword: this.state.userPassword
    }
    
    axios.post('http://ec2-54-212-242-149.us-west-2.compute.amazonaws.com:8080/user/authenticateUser', postData).then(response => response.data)
     .then((data) => {
       console.log(data)

       this.setState({
           isValid: true
       })

        this.setState({
            userFirstName: data.userFirstName
        })
        this.setState({
            userLastName: data.userLastName
        })

        console.log(this.state.userFirstName)
        console.log(this.state.userLastName)
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
        {this.state.isValid=== false ? (
        <Row >
            <Col>
            <Card style={{ width: '30rem' }}>
                <Card.Body>
               <form onSubmit={this.loginUser}>
                <Form.Group as={Row} className="mb-3" controlId="1">
                    <Form.Label column sm="6"><div><h5>Log In</h5></div></Form.Label>
                    <Form.Control type="email" placeholder="Email" value={this.state.userEmail} onChange={this.handleUserEmailChange}/>
                    <Form.Control type="password" placeholder="Password" value={this.state.userPassword} onChange={this.handleUserPasswordChange}/>
                </Form.Group>
               
                <Button type="submit" variant="primary" size="md" active>Login In</Button>
               
                </form>
                </Card.Body>
            </Card>
            </Col>
        </Row>): (
                <div>
                   <UserPage myPropEmail={this.state.userEmail} 
                          myPropFname={this.state.userFirstName}
                          myPropLname={this.state.userLastName}></UserPage> 
                
                </div>)}          
        </Container>
        </React.Fragment>
        )
    }
}

export default UserLogin;