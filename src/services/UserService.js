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
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/users/${id}`)
            .then(response => response.json())

    findUsers = id =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/users`)
            .then(response => response.json())

    findUserOnReddit = id =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/usersOnReddit/${id}`)
            .then(response => response.json())

    findUsersOnReddit = id =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/usersOnReddit`)
            .then(response => response.json())

    register = user =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/users/`, {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

    registerReddit = user =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/usersOnReddit/`, {
                    credentials: 'include',
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

    profile = () =>
        fetch("https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/profile", {
            credentials: 'include'
        }).then(response => response.json())

    logout = () =>
        fetch("https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/logout", {
            method: 'POST',
            credentials: 'include'
        })
    
    login = user =>
        fetch("https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/login", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        }).then(response => response.json())  

    updateUser = user =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/users/${user.id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

    updateUserOnReddit = user =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/usersOnReddit/${user.id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    body: JSON.stringify(user),
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

    likeThread = (user_id, thread_id) =>
        fetch(`https://wbdv-su1-19-final-server-nihaa.herokuapp.com/api/usersOnReddit/${user_id}/threads/${thread_id}`, {
                    credentials: 'include',
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
            .then(response => response)

}