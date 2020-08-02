import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Card from '@material-ui/core/Card';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import './styles.css'
import '../../index.css'

import { getPostalCodePrefixes } from '../../actions/location';

class NewPostForm extends Component {
    state = {
        id: -1,
        title: '',
        body: '',
        posterId: this.props.user.username,
        type: 'Request',
        date: {},
        status: 'active',
        location: this.props.user.location, // Defaults to the user's location
        postalCodePrefixes: []
    }

    componentDidMount() {
        getPostalCodePrefixes(this);
    }

    handleLocationChange = (event, values) => {
        this.setState({
            location: values
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    };

    onCreateNewPost = () => {
        this.setState({
            date: new Date()
        }, () => { 
            // Put handleCreateNewPost in the callback of setState to ensure that 
            // this.state.date is set before we call handleCreateNewPost
            const { id, title, body, posterId, type, date, status, location } = this.state;
            const newPost = { id, title, body, posterId, type, date, status, location };
            this.props.handleCreateNewPost(newPost);
        });
    }

    render() { 
        const { postalCodePrefixes } = this.state;
        const { user, handleBackToHome } = this.props;

        return (  
            <div >
                <Button className='new-post__back-btn'
                        onClick={() => handleBackToHome()}>
                        <ArrowBackIcon className='new-post__btn-icon'/>Nevermind
                </Button>
                <Card>
                    <div className='new-post__container'>
                        <div className='new-post__input'>
                            <TextField 
                                name='title'
                                onChange={this.handleInputChange}
                                label="Title"
                                fullWidth={true} 
                            />
                        </div>
                        <div className='new-post__input'>
                            <TextField
                                name='body'
                                onChange={this.handleInputChange}
                                label="Body"
                                multiline
                                fullWidth={true}
                            />
                        </div>
                        <div>
                            <span className='new-post__input new-post__select'>
                                {/* Note: The "index.js:1 Warning: findDOMNode is deprecated in StrictMode."
                                in the console is caused by Material UI's Select component */}
                                <span className='new-post__input-label'>Type:</span>
                                <Select
                                    name='type'
                                    value={this.state.type}
                                    onChange={this.handleInputChange}
                                >
                                    <MenuItem value={'Request'}>Request</MenuItem>
                                    <MenuItem value={'Offer'}>Offer</MenuItem>
                                </Select>
                            </span>
                            <span className='new-post__input new-post__select'>
                                <LocationOnIcon className='new-post__location-icon'/>
                                <span className='new-post__input-label new-post__location-label'>Location:</span>
                                <div className='new-post__location-selector'>
                                    <Autocomplete
                                        defaultValue={user.location}
                                        disableClearable
                                        onChange={this.handleLocationChange}
                                        options={postalCodePrefixes}
                                        renderInput={(params) => <TextField {...params}/>}
                                    />
                                </div>
                            </span>
                        </div>
                        <Button variant="outlined"
                                className='new-post__create-post-btn'
                                onClick={() => this.onCreateNewPost()}>
                                Post
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }
}
 
export default NewPostForm;