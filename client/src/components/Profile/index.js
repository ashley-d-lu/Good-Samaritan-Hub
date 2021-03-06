import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import Table from './userTable/index.js';
import PostList from '../PostList';

import './styles.css';

const columns = [{id: "label", name: "Label"}, {id: "content", name: "Content"}];

class Profile extends Component {

    generateRows = user => {
        const rows = [];
        rows.push({label: "Username", content: user.username});
        rows.push({label: "First Name", content: user.firstName});
        rows.push({label: "Last Name", content: user.lastName});
        rows.push({label: "Biography", content: user.bio});
        rows.push({label: "Location", content: user.location});
        return rows;
    }

    render() { 
        const { user, users, displayedUser, handleExpandPost, showExpandedPost, expandedPost,
            handleHidePostFromUser, handleGoToProfile, handleDeactivatePost, handleGoToEditProfile, handleGoToInboxFromPost } = this.props;
        return (
        <div className='profile'>
            <div className='profile__container'>
                <img src={`https://ui-avatars.com/api/?name=${displayedUser.firstName}+${displayedUser.lastName}&format=svg`} alt='user icon' className='profile__icon'/>

                {user.username !== displayedUser.username &&
                    <div className='profile__message'>
                        <Button className='profile__msg-btn' onClick={() => handleGoToInboxFromPost(displayedUser, null)}>
                            Message
                        </Button> 
                    </div>
                }

                <Card className='profile__card'>
                    <h1>Profile</h1>
                    <Table columns={columns} rows={this.generateRows(displayedUser)}/>
                    {user.username === displayedUser.username && <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={() => handleGoToEditProfile(displayedUser)}>Edit</Button>
                    </div>}
                </Card>
                <div className='profile__card'>
                    <PostList
                        user={user}
                        users={users}
                        restrictPostsToTargetLocation={false}
                        restrictPostsToUser={true}
                        displayedUser={displayedUser}
                        handleExpandPost={handleExpandPost} 
                        showExpandedPost={showExpandedPost} 
                        expandedPost={expandedPost}
                        handleBack={handleGoToProfile} 
                        handleHidePostFromUser={handleHidePostFromUser}
                        handleGoToProfile={handleGoToProfile}
                        handleGoToInboxFromPost={handleGoToInboxFromPost}
                        deactivatePost={handleDeactivatePost}
                    />
                </div>
            </div>

            <div className='profile__footer'></div>
        </div>
        )
    }
}
 
export default withRouter(Profile);