export default class RedditService {
    static myInstance = null;
    static getInstance() {
        if (RedditService.myInstance == null) {
            RedditService.myInstance =
                new RedditService();
        }
        return this.myInstance;
    }

    findThreads = (subreddit, keyword) =>
        fetch(`https://www.reddit.com/r/${subreddit}/search.json?restrict_sr=true&q=${keyword}`)
            .then(response => response.json())
}