import {Injectable} from "@angular/core";

const hasManageRole = {
    admin: true,
    manager: true
};

@Injectable()
export class AuthService {

    // TODO будет запрос
    getUserRole(): string {
        return 'manager';
    }

    isManager(role: string): boolean {
        return !!hasManageRole[role];
    }
}
