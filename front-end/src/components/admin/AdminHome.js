import React from 'react';
import { Container } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

import AdminLogin from './AdminLogin';
import AdminSignUp from './AdminSignUp';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const AdminHome = () => (
    <Container fluid  >
     <Row >
       <Col><div >
          <Card bg={'Primary'.toLowerCase()}
                border="light"
                text={'Primary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                className="mb-2">
              <Card.Body><h5>Admin View</h5></Card.Body>
          </Card>
           </div></Col>
     </Row>
      <Row>
      <Router>
        <div>        
          <Nav fill variant="tabs" >
          <Nav.Item>
              <Nav.Link  href="/adminlogin">Login In</Nav.Link>
          </Nav.Item>
          <Nav.Item>
              <Nav.Link eventKey="/adminsignup" href="/adminsignup">Create New Account</Nav.Link>
          </Nav.Item>
          </Nav>
          <Switch>
            <Route path="/adminsignup">
              <AdminSignUp/>
            </Route>
            <Route path="/adminlogin">
              <AdminLogin/>
            </Route>
          </Switch>
        </div>
      </Router>
      </Row>
      
      </Container>);

export default AdminHome;
