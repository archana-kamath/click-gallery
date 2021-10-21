import logo from './logo.svg';
import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHome from './components/user/UserHome';
import AdminHome from './components/admin/AdminHome';
import AdminLogin from './components/admin/AdminLogin';
import AdminSignUp from './components/admin/AdminSignUp';
import UserLogin from './components/user/UserLogin';
import UserSignUp from './components/user/UserSignUp';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { Nav } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import UserPage from './components/user/UserPage';


function App() {

  return (<React.Fragment>    
          <Container fluid>
          <Router> 
            <Row>
              <Col><div >
              <Card bg={'Primary'.toLowerCase()}
                    border="light"
                    text={'Primary'.toLowerCase() === 'light' ? 'dark' : 'white'}
                    className="mb-2">
                    <Card.Body>
                    <Row>
                    <Col>
                    <h4>Click Gallery</h4>
                    </Col><Col> </Col>
                    <Col>
                     
                     
                    <Link to="/userhome"> <Button  variant="light">Are you a User?</Button></Link>
                    <Link to="/adminhome"> <Button variant="light">Are you an Admin?</Button></Link>
                    <Link to="/"> <Button variant="light">Logout</Button></Link>
                    </Col>
                    </Row>
                  </Card.Body>
              </Card>
              </div></Col>
            
            </Row>
                       <Switch>
                          <Route path="/userhome">
                            <UserHome/>
                          </Route>
                          <Route path="/adminhome">
                            <AdminHome/>
                          </Route>
                          <Route path='/userSignup' component={UserSignUp} />
                          <Route path='/userpage' component={UserPage} />
                          <Route path='/userlogin' component={UserLogin} />
                          <Route path='/adminSignup' component={AdminSignUp} />
                          <Route path='/adminlogin' component={AdminLogin} />

                    </Switch>
                    </Router>
            </Container>
          </React.Fragment>
          );
}

export default App;
