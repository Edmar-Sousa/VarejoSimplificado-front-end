import { jwtDecode } from 'jwt-decode'

export interface DecodedTokenType {
    sub: string;
    username: string;
    email: string;
    role: string;
    business_id: string | null;
    iat: number;
    nbf: number;
    exp: number;
}


export function getTokenSessionStorage() {
    const token = sessionStorage.getItem('access_token');
    return token || '';
}

export function setTokenSessionStorage(token: string) {
    sessionStorage.setItem('access_token', token);
}

export function removeTokenSessionStorage() {
    sessionStorage.removeItem('access_token');
}

export function decodeJwtToken(token: string) {
    if (token.length == 0)
        return {} as DecodedTokenType;
    
    return jwtDecode<DecodedTokenType>(token);
}

export function validateToken(token: string) {
    const decoded = decodeJwtToken(token);
    const currentTime = Math.floor(Date.now() / 1000);
    
    return decoded.exp > currentTime;
}
