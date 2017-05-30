import {Injectable, EventEmitter} from '@angular/core';
import {AuthService} from './AuthService';

@Injectable()
export class StorageService {
    constructor(private authService: AuthService) {
        console.log('storage service');
    }

    onSetLastSection = new EventEmitter();
    lastGroupId: number = null;
    _lastSection: number = null;
    cachedGroups = {};

    onShowAlert = new EventEmitter();
    alertText: string;
    _showAlert = false;

    set showAlert(showAlert: boolean) {
        this._showAlert = showAlert;
    }

    get showAlert(): boolean {
        return this._showAlert;
    }

    get lastSection(): number {
        return this._lastSection;
    }

    set lastSection(lastSection: number) {
        this._lastSection = lastSection;
        if (lastSection) {
            this.onSetLastSection.emit();
        }
    }

    isAdmin(): boolean {
        let isAdminFlag = this.authService.isManager();
        this.authService.onRoleChange
            .subscribe(() => {
                isAdminFlag = this.authService.isManager();
            });

        return isAdminFlag;
    }
}
