// Replaces escape/special characters in <input> with '' to prevent Regex errors when 
// searching for <input> in a string
const cleanInput = input => input.replace(/[\\/:*?"<>|[]/g, '')


// Returns the posts in <posts> that contain <searchTerm> in their title
export const getMatchingPosts = (searchTerm, posts) => {
    searchTerm = cleanInput(searchTerm).trim();
    return posts.filter(post => {
        return searchTerm.length !== 0 && post.title.search(new RegExp(searchTerm, 'i')) !== -1;
    });
}


// Returns the users in <users> that contain <searchTerm> in their username or full name
export const getMatchingUsers = (searchTerm, users) => {
    searchTerm = cleanInput(searchTerm).trim();
    return users.filter(user => {
        const fullName = `${user.firstName} ${user.lastName}`;
        return (searchTerm.length !== 0 &&
            (user.username.search(new RegExp(searchTerm, 'i')) !== -1 ||
            fullName.search(new RegExp(searchTerm, 'i')) !== -1))
    });
}


// Returns a list of the posts at the given location
// Phase 2: Make a server call to get the posts instead of searching in the <posts> list
export const getPostsByLocation = (posts, location) => posts.filter(post => post.location === location);


// Returns a list of the given user's posts
// Phase 2: Make a server call to get the posts instead of searching in the <posts> list
export const getPosts = (user, posts) => posts.filter(post => user.posts.includes(post.id));


// Returns a list of the given user's reported posts
// Phase 2: Make a server call to get the posts instead of searching in the <posts> list
export const getReportedPosts = (user, posts) => posts.filter(post => user.reportedPosts.includes(post.id));


// Returns the post with the given id
// Phase 2: Make a server call to get the post instead of searching in the <posts> list
export const getPost = (id, posts) => posts.find(post => post.id === id);


// Returns the user with the given username
// Phase 2: Make a server call to get the user instead of searching in the <users> list
export const getUser = (username, users) => users.find(user => user.username === username);