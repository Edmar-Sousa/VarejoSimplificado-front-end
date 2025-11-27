
interface LoginResponse {
    accessToken: string;
}

export function loginUser(email: string, password: string): Promise<LoginResponse> {

    console.log(email, password)

    return new Promise((resolve) => {
        setTimeout(() => resolve({ accessToken: '123' }), 1000);
    });

}

