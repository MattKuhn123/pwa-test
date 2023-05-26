import { Injectable } from '@angular/core';

const appkey: string = "dc609b30-bd47-415a-a1f9-91481b07c439";

@Injectable()
export class SessionSaveService {
  public save(key: string, value: any): void {
    const content: any = this.getContent();
    content[key] = JSON.stringify(value);
    localStorage.setItem(appkey, JSON.stringify(content));
  }

  public load(key: string): any {
    const content: any = this.getContent();
    if (!content[key]) {
      return null;
    }

    const result = JSON.parse(content[key]);
    return result;
  }

  private getContent(): any {
    const content: string | null = localStorage.getItem(appkey);
    if (!content) {
      return {};
    }

    return JSON.parse(content);
  }
}
