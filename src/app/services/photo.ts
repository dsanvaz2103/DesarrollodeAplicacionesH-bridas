import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@ionic/storage-angular'; // <--- Importamos Storage

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  public foto: string | undefined;
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Inicializamos la base de datos local
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    // Al arrancar, buscamos si ya había una foto guardada
    this.foto = await this._storage.get('perfil_foto');
  }

  public async tomarFoto() {
    try {
      const capturedPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri, 
        source: CameraSource.Camera,     
        quality: 100                     
      });

      this.foto = capturedPhoto.webPath;

      // --- PERSISTENCIA (UT7) ---
      // Guardamos la ruta de la foto para que no se borre
      if (this._storage && this.foto) {
        await this._storage.set('perfil_foto', this.foto);
      }
      
    } catch (e) {
      console.log('Cámara cerrada sin hacer foto');
    }
  }

  // Por si el skater quiere borrar su foto
  public async borrarFoto() {
    this.foto = undefined;
    if (this._storage) {
      await this._storage.remove('perfil_foto');
    }
  }
}