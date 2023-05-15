class ApiRequest {
    jwtToken: string;
    baseUrl: string;

    constructor(baseUrl: string, jwtToken: string) {
        this.baseUrl = baseUrl;
        this.jwtToken = jwtToken;
    }
}

export default ApiRequest;