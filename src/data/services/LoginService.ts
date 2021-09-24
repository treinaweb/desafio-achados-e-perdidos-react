import { LoginFormDataInterface } from 'data/@types/FormInterface';
import { LocationInterface } from 'data/@types/LocationInterface';
import { ApiService } from './ApiService';
import { LocalStorage } from './StorageService';

export const LoginService = {
    async login(credentials: LoginFormDataInterface): Promise<boolean> {
        try {
            const { data } = await ApiService.post<{
                access: string;
                refresh: string;
            }>('/api/auth/login', credentials);

            LocalStorage.set('token', data.access);
            LocalStorage.set('token_refresh', data.refresh);

            ApiService.defaults.headers['Authorization'] =
                'Bearer ' + data.access;

            return true;
        } catch (error) {
            return false;
        }
    },
    logout(): void {
        LocalStorage.clear('token');
        LocalStorage.clear('token_refresh');
    },
    async getEstablishment(): Promise<LocationInterface | undefined> {
        const token = LocalStorage.get('token', '');
        if (token) {
            ApiService.defaults.headers['Authorization'] = 'Bearer ' + token;
            return (await ApiService.get<LocationInterface>('/api/locais'))
                .data;
        }
        return undefined;
    },
};
