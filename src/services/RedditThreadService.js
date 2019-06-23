export default class RedditThreadService {
    static myInstance = null;
    static getInstance() {
        if (RedditThreadService.myInstance == null) {
            RedditThreadService.myInstance =
                new RedditThreadService();
        }
        return this.myInstance;
    }

    findThreads = (subreddit, keyword) =>
        fetch(`https://www.reddit.com/r/${subreddit}/search.json?restrict_sr=true&q=${keyword}`)
            .then(response => response.json())

    findThread = (id) =>
        fetch(`http://localhost:8080/api/reddit_threads/${id}`)
            .then(response => response.json())

    getThreads = () =>
        fetch(`http://localhost:8080/api/reddit_threads/`)
            .then(response => response.json())

    createThread = thread =>
        fetch(`http://localhost:8080/api/reddit_threads/`, {
                    method: 'POST',
                    body: JSON.stringify(thread),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response.json())

    fetchThread = (subreddit, id) =>
        fetch(`https://www.reddit.com/r/${subreddit}/comments/${id}/.json`)
            .then(response => response.json())

    addCommenter = (id, username) => 
        fetch(`http://localhost:8080/api/reddit_threads/${id}/${username}`, {
                    method: 'PUT'
                })
            .then(response => response.json())

                  
}