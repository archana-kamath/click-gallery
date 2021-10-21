import React from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

class AdminViewAll extends React.Component {

    constructor(props) {
        super(props);

        this.state= {
            allImages:[]
        }
    }

    componentDidMount(props){

        axios.get('http://ec2-54-212-242-149.us-west-2.compute.amazonaws.com:8080/click/allImages').then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({ allImages: data})
       });
    }

    render(){
        return(
        <React.Fragment>
                {(this.state.allImages.length === 0) ? (
				<div></div>
			   ):(
        <div>
          <Table >
            {this.state.allImages.length ===0?(<div></div>):(
              <thead class="thead-dark">
              <tr><th>#</th><th>Name</th><th>About</th><th>Click to view</th><th>By</th>
              <th>Uploaded On</th><th>Updated On</th></tr>
            </thead> 
            )}

          {this.state.allImages.map(item => (

            <tbody>
              <tr key={item.fileId}>
                <td>{item.fileId}</td>
                <td>{item.fileName}</td>
                <td>{item.fileDesc}</td>
                <td><a href={item.fileURL} target="_blank" rel="noreferrer noopener">{item.fileName}</a></td>
                <td>{item.userEmail}</td>
                <td>{item.uploadDate}</td>
                <td>{item.updateDate}</td>
              </tr>
            </tbody>
           
          ))} </Table>
      </div>)}
        </React.Fragment>)
    }
}

export default AdminViewAll;