import {Injectable, EventEmitter} from "@angular/core";
import {AuthService} from "./AuthService";

@Injectable()
export class StorageService {
    constructor(private authService:AuthService) {

    }

    onSetLastSection = new EventEmitter();
    lastGroupId: number = null;
    _lastSection: number = null;
    cachedGroups = {};

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
