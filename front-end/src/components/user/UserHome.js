import React from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

import UserLogin from './UserLogin';
import UserSignUp from './UserSignUp';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const UserHome = () => (
    <Container fluid  >
     <Row >
       <Col><div >
          <Card bg={'Primary'.toLowerCase()}
                border="light"
                text={'Primary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2">
              <Card.Body><h5>User View</h5></Card.Body>
          </Card>
           </div></Col>
     </Row>
      <Row>
       <Router>
        <div>        
          <Nav fill variant="tabs" >
          <Nav.Item>
              <Nav.Link  href="/userlogin">Login In</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="/usersignup" href="/usersignup">Create New Account</Nav.Link>
          </Nav.Item>
          </Nav>
          <Switch>
            <Route path="/usersignup">
              <UserSignUp/>
            </Route>
            <Route path="/userlogin">
              <UserLogin/>
            </Route>
          </Switch>
        </div>
      </Router>
      
    
      </Row>
      </Container>);

export default UserHome;
