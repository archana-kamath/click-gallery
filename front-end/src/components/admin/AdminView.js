import React from 'react';
import axios from 'axios';
import { ButtonGroup, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class AdminView extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            selectValue: '',
            userImages:[],
            users:[]
        }

        this.handleUserChange = this.handleUserChange.bind(this);
    }

    componentDidMount(props){

        axios.get('http://ec2-54-212-242-149.us-west-2.compute.amazonaws.com:8080/user/allUsers').then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({ users: data})
       });

    }

    handleUserChange = selectedOption => {
        
        console.log(selectedOption)
        this.setState({selectValue:selectedOption})

        const postUser = {
            userEmail: selectedOption
        }

        axios.post('http://ec2-54-212-242-149.us-west-2.compute.amazonaws.com:8080/click/userView', postUser).then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({ userImages: data})
       });
    }

    render(){
        const { selectValue } = this.state;
        return(
        <React.Fragment>
                       &nbsp;&nbsp;
           <div class="col d-flex justify-content-center">
         <ButtonGroup>
         <DropdownButton as={ButtonGroup} title="Select the user" id="bg-nested-dropdown" 
                    onSelect={this.handleUserChange} value={selectValue}>
                   
                    {this.state.users.map(item => (
                         <Dropdown.Item eventKey={item.userEmail}>{item.userEmail}</Dropdown.Item>
                    ))}
                </DropdownButton>
            &nbsp;&nbsp;
            </ButtonGroup>
            </div>
            &nbsp;&nbsp;
        {(this.state.userImages.length === 0) ? (
				<div></div>
			   ):(
        <div>
          <Table >
            {this.state.userImages.length ===0?(<div></div>):(
              <thead>
              <tr><th>#</th><th>Name</th><th>About</th><th>Click to view</th>
              <th>Uploaded On</th><th>Updated On</th></tr>
            </thead> 
            )}

          {this.state.userImages.map(item => (

            <tbody>
              <tr key={item.fileId}>
                <td>{item.fileId}</td>
                <td>{item.fileName}</td>
                <td>{item.fileDesc}</td>
                <td><a href={item.fileURL} target="_blank" rel="noreferrer noopener">{item.fileName}</a></td>
                <td>{item.uploadDate}</td>
                <td>{item.updateDate}</td>
              </tr>
            </tbody>
           
          ))} </Table>
      </div>)}
        </React.Fragment>)
    }
}

export default AdminView;