import { create } from 'zustand'


import UserRole from '../enums/user.enum';
import { 
    getTokenSessionStorage, 
    setTokenSessionStorage,
    removeTokenSessionStorage, 
    decodeJwtToken,

    type DecodedTokenType 
} from '../utils/token';

interface AuthStateType {
    accessToken: string;
    decodedToken: DecodedTokenType;

    setAccessToken: (token: string) => void;
    isAdminUser: () => boolean;
    logoutUser: () => void;
}



export const useAuthStore = create<AuthStateType>((set, get) => ({
    accessToken: getTokenSessionStorage(),
    decodedToken: decodeJwtToken(getTokenSessionStorage()),

    isAdminUser: () => {
        const role = get().decodedToken.role;
        return role === UserRole.ADMIN;
    },

    setAccessToken: (token: string) => {
        setTokenSessionStorage(token);
        const decoded = decodeJwtToken(token);

        set({ 
            accessToken: token,
            decodedToken: decoded
        });
    },

    logoutUser: () => {
        removeTokenSessionStorage();
        
        set({
            accessToken: '',
            decodedToken: {} as DecodedTokenType,
        });
    },
}))

