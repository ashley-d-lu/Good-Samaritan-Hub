import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';

import Table from './userTable/index.js';
import PostList from '../PostList';

import './styles.css';
import { getPosts } from '../../actions/search';

const columns = [{id: "label", name: "Label"}, {id: "content", name: "Content"}];

class Profile extends Component {
    state = {
        userPosts: []
    }

    updateUserPosts() {
        const { displayedUser, posts } = this.props;
        this.setState({
            userPosts: getPosts(displayedUser, posts)
        });
    }

    componentDidMount() { 
        this.updateUserPosts();
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.updateUserPosts();
        }
    }
    
    generateRows = user => {
        const rows = [];
        rows.push({label: "Username", content: user.username});
        rows.push({label: "First Name", content: user.firstName});
        rows.push({label: "Last Name", content: user.lastName});
        rows.push({label: "Biography", content: user.bio});
        rows.push({label: "Location", content: user.location});
        return rows;
    }

    // If the user and displayed user are different, display a post only if it's
    // status is active. Else, show all posts (active and inactive).
    filterCondition = post => {
        const { user, displayedUser } = this.props;
        if (user.username !== displayedUser.username) {
            return post.status === 'active'
        } else {
            return true;
        }
    }

    render() { 
        const {user, users, displayedUser, targetLocation, handleChangeTargetLocation, handleExpandPost, showExpandedPost, expandedPost,
            handleReportPost, recentlyReportedPosts, handleGoToProfile, handleDeactivatePost, handleGoToEditProfile, handleGoToInboxFromPost} = this.props;
        const {userPosts} = this.state;
        return (
        <div className='profile'>
            <div className='profile__container'>
                <img src={require('../../resources/userIcon.png')} alt='user icon' className='profile__icon'/>

                {user !== displayedUser &&
                    <div className='profile__message'>
                        <Button className='profile__msg-btn' onClick={() => handleGoToInboxFromPost(displayedUser)}>
                            Message
                        </Button> 
                    </div>
                }

                <Card className='profile__card'>
                    <h1>Profile</h1>
                    <Table columns={columns} rows={this.generateRows(displayedUser)}/>
                    {user === displayedUser && <div className='profile__button'>
                        <Button className='profile__save-button' startIcon={<EditIcon/>} onClick={() => handleGoToEditProfile(displayedUser)}>Edit</Button>
                    </div>}
                </Card>
                {!displayedUser.posts.length && <Card className='profile__card'>
                    <h1>User has not posted</h1>
                </Card>}
                <div className='profile__card'>
                    {displayedUser.posts.length > 0 && <PostList
                        user={user}
                        users={users}
                        posts={userPosts.filter(post => this.filterCondition(post))} 
                        targetLocation={targetLocation}
                        restrictPostsToTargetLocation={false}
                        handleChangeTargetLocation={handleChangeTargetLocation}
                        handleExpandPost={handleExpandPost} 
                        showExpandedPost={showExpandedPost} 
                        expandedPost={expandedPost}
                        handleBack={handleGoToProfile} 
                        handleReportPost={handleReportPost}
                        recentlyReportedPosts={recentlyReportedPosts}
                        handleGoToProfile={handleGoToProfile}
                        handleGoToInboxFromPost={handleGoToInboxFromPost}
                        deactivatePost={handleDeactivatePost}
                    />}
                </div>
            </div>

            <div className='profile__footer'></div>
        </div>
        )
    }
}
 
export default withRouter(Profile);