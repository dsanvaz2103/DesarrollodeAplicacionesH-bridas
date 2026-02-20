// src/app/services/settings.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SettingsService { // <--- El nombre DEBE ser este
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init(): Promise<void> {
    if (this._storage != null) return;
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public async set(key: string, value: any): Promise<void> {
    await this.init();
    await this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    await this.init();
    return await this._storage?.get(key);
  }
}