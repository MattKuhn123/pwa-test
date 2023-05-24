import { Injectable } from '@angular/core';

@Injectable()
export class SaveService {
  public save(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public load(key: string): any {
    const value: string |null = localStorage.getItem(key);
    if (!value) {
      return null;
    }

    const options = JSON.parse(value);
    return options;
  }
}
