class AuthRequest {
    baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl + "/api/auth";
    }

    register = async (role: string, email: string, username: string, password: string) => {
        const registerDTO = {
            role,
            email,
            username,
            password
        }

        const response = await fetch(`${this.baseUrl}/register`, {
            method: 'POST',
            body: JSON.stringify(registerDTO),
            headers: { 'Content-Type': 'application/json' }
        })

        console.log(response);
    }

    login = async (username: string, password: string) => {
        const loginDTO = {
            username,
            password
        }

        const response = await fetch(`${this.baseUrl}/login`, {
            method: 'POST',
            body: JSON.stringify(loginDTO),
            headers: { 'Content-Type': 'application/json' }
        })

        console.log(response);
    }

}

export default AuthRequest;