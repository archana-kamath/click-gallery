import React from 'react';
import axios from 'axios';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { Form, FormControl, InputGroup ,Card} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class UserDownload extends React.Component {

    constructor(props) {
        super(props);

       this.state ={
           selectValue: "",
           userImages:[],
           showDownloadButton: false
       }
       this.handleDownloadDropdownChange = this.handleDownloadDropdownChange.bind(this);
    }

    componentDidMount(props){

        const postUser = {
            userEmail: this.props.userEmailProp
        }

        console.log(postUser)

        axios.post('http://ec2-54-212-242-149.us-west-2.compute.amazonaws.com:8080/click/userView', postUser).then(response => response.data)
        .then((data) => {
          console.log(data)
          this.setState({userImages:data})
       });

    }

    
    handleDownloadDropdownChange = selectedOption => {
        
    

        console.log(selectedOption)
        this.setState({showDownloadButton:true})
        this.setState({selectValue:selectedOption})

       console.log(`Show value`,this.state.showDownloadButton)
       console.log(`Selected Value`,this.state.selectValue)

    }

    onFileDownload = () => {

        const selectedFile = `${this.state.selectValue}`

        console.log(`Downloading file`,this.state.selectValue)

        
        axios.get(`http://ec2-54-212-242-149.us-west-2.compute.amazonaws.com:8080/click/download/${selectedFile}`)
            .then(response => response.data)
             .then((data) => {
             console.log(data)
        });  

        alert("Downloaded Successfully in C:\AWSFile folder")
    }

    render(){
        const { selectValue } = this.state;
        return (
        <React.Fragment>
                <Card style={{ width: '52rem' }}>
                <Card.Body>
                <div class="col d-flex justify-content-center">
            <ButtonGroup>
                <DropdownButton as={ButtonGroup} title="Select the image to download" id="bg-nested-dropdown" 
                    onSelect={this.handleDownloadDropdownChange} value={selectValue}>
                   
                    {this.state.userImages.map(item => (
                         <Dropdown.Item eventKey={item.fileName}>{item.fileName}</Dropdown.Item>
                        
                    ))}
                </DropdownButton>
            </ButtonGroup>
            </div>
            <div class="col d-flex justify-content-center">

             {this.state.showDownloadButton=== true? (
                <div>
                    <div>&nbsp;&nbsp;</div>
                    {this.state.selectValue}
                    <div>&nbsp;&nbsp;</div>
                   <Button  onClick={this.onFileDownload} variant="primary">Download</Button>{' '}
                </div>
             ):(<div></div>)} 
             </div>
        </Card.Body></Card>
        </React.Fragment>)

    }
}

export default UserDownload;