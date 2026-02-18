// src/app/services/preferences.service.ts
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializa Storage
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  /** Modo Oscuro */
  async setDarkMode(isDark: boolean): Promise<void> {
    if (!this._storage) return;
    await this._storage.set('darkMode', isDark);
  }

  async getDarkMode(): Promise<boolean> {
    if (!this._storage) return false;
    const value = await this._storage.get('darkMode');
    return value ?? false; // por defecto false
  }

  /** Nombre de Usuario */
  async setUsername(name: string): Promise<void> {
    if (!this._storage) return;
    await this._storage.set('username', name);
  }

  async getUsername(): Promise<string> {
    if (!this._storage) return '';
    const value = await this._storage.get('username');
    return value ?? '';
  }

  /** Método para limpiar todas las preferencias (opcional) */
  async clearPreferences(): Promise<void> {
    if (!this._storage) return;
    await this._storage.clear();
  }
}
