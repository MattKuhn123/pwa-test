import { SaveService } from '../app/save.service';

export const saveStub: Partial<SaveService> = {
  load(key: string): any {

  },

  save(key: string, content: any): void {

  }
}