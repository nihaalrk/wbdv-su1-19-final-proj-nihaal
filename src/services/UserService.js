export default class UserService {
    static myInstance = null;
    static getInstance() {
        if (UserService.myInstance == null) {
            UserService.myInstance =
                new UserService();
        }
        return this.myInstance;
    }

    findUser = id =>
        fetch(`http://localhost:8080/api/users/${id}`)
            .then(response => response.json())

    findUserOnReddit = id =>
        fetch(`http://localhost:8080/api/usersOnReddit/${id}`)
            .then(response => response.json())

    register = user =>
        fetch(`http://localhost:8080/api/users/`, {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

    registerReddit = user =>
        fetch(`http://localhost:8080/api/usersOnReddit/`, {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

    profile = () =>
        fetch("http://localhost:8080/api/profile", {
            credentials: 'include'
        }).then(response => response.json())

    logout = () =>
        fetch("http://localhost:8080/api/logout", {
            method: 'POST',
            credentials: 'include'
        })
    
    login = user =>
        fetch("http://localhost:8080/api/login", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        }).then(response => response.json())  

    updateUser = user =>
        fetch(`http://localhost:8080/api/users/${user.id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

    updateUserOnReddit = user =>
        fetch(`http://localhost:8080/api/usersOnReddit/${user.id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

    likeThread = (user_id, thread_id) =>
        fetch(`http://localhost:8080/api/usersOnReddit/${user_id}/threads/${thread_id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

}