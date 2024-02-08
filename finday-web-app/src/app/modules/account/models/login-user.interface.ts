export interface LoginUser {
    email: string;
    password: string;
    data?: {
        accessToken: '',
        expiresIn: ''
    }
}