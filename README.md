# 🛹 Urban Skate Shop - Aplicación Nativa Android
**Autor:** David SV  
**Curso:** Desarrollo de Aplicaciones Multiplataforma (UT6)

---

## 1. Introducción 🚀 (RA4.ce1)
En este proyecto he transformado mi aplicación web de Angular en una **App Nativa para Android** utilizando **Capacitor**. El objetivo principal ha sido la integración de hardware real (Cámara y GPS) y la mejora de la experiencia de usuario en dispositivos móviles.

## 2. Configuración del Entorno y Permisos ✅ (RA4.ce1)
Para profesionalizar el despliegue, realicé los siguientes ajustes técnicos:

* **Identidad de la App:** Modifiqué `capacitor.config.ts` estableciendo el ID `com.davidsv.urbanshop` y el nombre "Urban Skate Shop".
* **Permisos Nativos:** Configuré el archivo `AndroidManifest.xml` para solicitar acceso a los sensores necesarios:
  * `CAMERA`: Para la gestión de fotos de perfil.
  * `ACCESS_FINE_LOCATION`: Para la ubicación precisa del punto de entrega.
  * `VIBRATE`: Para el feedback háptico.

### Captura de Configuración (Permisos XML):
> ![Permisos Android](screenshots/manifest_permisos.png)

---

## 3. Implementación de Plugins e Integración (RA4.ce2) 🛠️
Para alcanzar la máxima calificación, he implementado las funciones base y **dos mejoras de hardware adicionales**:

1. **Cámara (Capacitor Camera):** Permite al usuario capturar una foto real para su avatar en la sección "Cuenta".
2. **GPS (Capacitor Geolocation):** En el "Carrito", se obtienen las coordenadas exactas del usuario para gestionar el envío.
3. **Haptics (Mejora Extra 1):** Feedback táctil (vibración) al añadir productos al carrito y al finalizar pedidos.
4. **Share (Mejora Extra 2):** Botón nativo en la cabecera que permite compartir la URL del proyecto mediante el menú del sistema Android.

---

## 4. Resolución de Problemas (Troubleshooting) (RA4.ce4) 🛑
Durante el desarrollo surgieron retos técnicos que documenté para su resolución:

* **🛑 Problema:** Error de conexión (Pantalla blanca) al usar Live Reload en el emulador.
* **🔍 Causa:** Android bloquea el tráfico HTTP "Cleartext" (no cifrado) por defecto.
* **✅ Solución:** Añadí `android:usesCleartextTraffic="true"` en la etiqueta `<application>` del Manifest y corregí la estructura de etiquetas XML.

---

## 5. Informe de Usabilidad (RA2.ce5) 📱
He analizado la experiencia de uso (UX) en el dispositivo real:

* **Ergonomía:** He rediseñado el botón de GPS con `expand="block"` para facilitar el toque con el pulgar. El botón de compartir se ubicó en la parte superior derecha por ser una zona de interacción estándar.
* **Visibilidad:** El uso de `Ion-Badge` rojos sobre la barra azul ofrece un contraste claro para el estado del carrito, incluso en exteriores.
* **Navegación:** La App responde correctamente al botón físico "Atrás" de Android, manteniendo el flujo de navegación de Angular.
* **Mejora aplicada:** Tras el testeo, decidí añadir un **Toast** de éxito tras añadir al carrito para confirmar visualmente la acción al usuario.

---

## 6. Evidencias del Despliegue 📸 (RA4.ce3)
La aplicación es totalmente funcional y fluida en entorno nativo.

| Perfil con Cámara | Carrito con GPS | Interfaz Principal |
| :---: | :---: | :---: |
| ![Avatar](screenshots/app_foto.png) | ![Geolocalización](screenshots/app_gps.png) | ![Home](screenshots/app_home.png) |

---


## 7. Despliegue, Marketing y Lanzamiento (UT7 Completa) 🚀

### 🎨 7.1 Imagen de Marca: Iconografía y Splash Screen
He personalizado totalmente la identidad visual de **Urban Skate Shop** para ofrecer una experiencia inmersiva:

* **Icono:** He generado un icono adaptativo profesional utilizando el logo vintage de la tienda, asegurando una visualización nítida en todos los dispositivos Android.
* **Splash Screen:** He implementado una pantalla de carga que muestra una fotografía real de la tienda con decenas de tablas expuestas, situando al usuario en el ambiente de compra desde el primer segundo.
* **Herramienta:** Utilicé la utilidad `@capacitor/assets` para la generación automática de todas las densidades de pantalla necesarias.

### 📦 7.2 & 7.3 Compilación y Firma (AAB vs APK)
He generado el ejecutable final siguiendo los estándares actuales de Google Play:
* **Formato Android App Bundle (.aab):** He optado por este formato en lugar del APK tradicional para permitir que Google Play optimice el tamaño de descarga según el dispositivo del usuario.
* **Firma de Release:** La aplicación ha sido compilada en modo `release` y firmada con mi certificado digital (`david-skate.keystore`), garantizando que solo yo puedo subir actualizaciones de esta App.
* **Optimización:** Se ha realizado un `ionic build --prod` previo para minificar el código y mejorar el rendimiento en dispositivos reales.

### 7.4 & 7.5 Ficha de la Tienda y ASO 📈
He diseñado una estrategia de posicionamiento para **Urban Skate Shop**:
- **ASO:** Optimización de palabras clave (Skate, Tablas, Envío GPS) para aparecer en búsquedas orgánicas.
- **Visuales:** Capturas de pantalla estratégicas que muestran la facilidad de uso del carrito y el perfil nativo.

### 7.6 Mantenimiento y Ciclo de Vida 🔄
Se ha establecido un plan de mantenimiento preventivo para actualizar los plugins de Capacitor y asegurar la compatibilidad con futuras versiones de Android (API 36+).
