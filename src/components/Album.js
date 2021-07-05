import React, { Component } from 'react'
import  {Form, FormGroup, Label, Input} from 'reactstrap';
import RenderAlbum from './RenderAlbum';

export class Album extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             album: '',
             albumdata: '',
             errorMessage: ''
        };
        
    // binding object
    this.HandleChange = this.HandleChange.bind(this);
    this.HandleSubmit = this.HandleSubmit.bind(this);
    }
        
      HandleChange  = (event) => {
          this.setState({
              album: event.target.value
          });
     }
        
      HandleSubmit = (event) => {
          event.preventDefault();
          fetch(`https://jsonplaceholder.typicode.com/albums/${this.state.album}/photos`)
                .then(response => {
                    if(response.ok){
                        return response.json();
                    }
                    throw response
                })
                .then(data  =>this.setState({
                    albumdata: data,
                    errorMessage: ''
                }))
                .catch(error => this.setState({
                    albumdata: '',
                    errorMessage: error
                }))

       // clear form data after submittion
       
     }
     HandleFocus = () =>{
         this.setState({
             album: ''
         });
     }

    render() {
        return (
            <div className="row">
            <div className="col-12 col-sm-3"></div>
            <div className="col-12 col-sm-6 mt-5">
               <Form>
      <FormGroup>
        <Label for="exampleEmail">Album ID</Label>
        <Input type="text" name="album_id" id="albumId" placeholder="search by  album id" value={this.state.album} onChange={this.HandleChange} onFocus={this.HandleFocus} />
      </FormGroup>
      <FormGroup>
      <button type="button" className="btn btn-primary float-right" onClick = {this.HandleSubmit}>Get Album Photos By Id</button>
      </FormGroup>
      </Form>
      </div>
      <div className="col-12 col-sm-3"></div>
      
          <RenderAlbum albums ={this.state.albumdata} errorMessage = {this.state.errorMessage}></RenderAlbum>
      
            </div>
        )
    }
}

export default Album
