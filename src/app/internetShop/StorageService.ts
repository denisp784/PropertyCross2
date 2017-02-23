import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class StorageService {
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


}
