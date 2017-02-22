import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class StorageService {
    onSetLastSection = new EventEmitter();
    onSetLastGroup = new EventEmitter();

    _lastSection: number = null;

    get lastSection(): number {
        return this._lastSection;
    }

    set lastSection(lastSection: number) {
        this._lastSection = lastSection;
        if (lastSection) {
            this.onSetLastSection.emit();
        }
    }

    _lastGroup: number = null;

    get lastGroup(): number {
        return this._lastGroup;
    }

    set lastGroup(lastGroup: number) {
        this._lastGroup = lastGroup;
        if (lastGroup) {
            this.onSetLastGroup.emit();
        }
    }

    cachedGroup = {};
}
