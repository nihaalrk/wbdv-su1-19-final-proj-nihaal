export default class RedditUserService {
    static myInstance = null;
    static getInstance() {
        if (RedditUserService.myInstance == null) {
            RedditUserService.myInstance =
                new RedditUserService();
        }
        return this.myInstance;
    }

    findUser = username =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/reddit_users/${username}`)
            .then(response => response.json())

    createUser = user =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/reddit_users/`, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response.json())

    fetchUser = username =>
        fetch(`https://www.reddit.com/user/${username}/about.json`)
            .then(response => response.json())

    threadsCommentedOn = username =>
         fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/reddit_users/${username}/reddit_threads`)
            .then(response => response.json())    
                  
}