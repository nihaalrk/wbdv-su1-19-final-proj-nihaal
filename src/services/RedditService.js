export default class RedditService {
    static myInstance = null;
    static getInstance() {
        if (RedditService.myInstance == null) {
            RedditService.myInstance =
                new RedditService();
        }
        return this.myInstance;
    }

    findThreads = () =>
        fetch("https://www.reddit.com/r/leagueoflegends/search")
            .then(response => response.json())
}