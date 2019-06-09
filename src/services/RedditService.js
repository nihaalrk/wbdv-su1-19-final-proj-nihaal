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
        fetch("https://www.reddit.com/r/leagueoflegends/search.json?restrict_sr=true&q=Qiyana")
            .then(response => response.json())
}