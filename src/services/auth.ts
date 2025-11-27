
interface LoginResponse {
    accessToken: string;
}

export function loginUser(email: string, password: string): Promise<LoginResponse> {

    return new Promise((resolve) => {
        setTimeout(() => resolve({ accessToken: '123' }), 1000);
    });

}

