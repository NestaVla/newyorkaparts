# New York Aparts — Guía de Deploy y Edición

## 📁 Estructura del proyecto

```
newyorkaparts/
├── index.html          ← Página principal
├── style.css           ← Estilos
├── main.js             ← Lógica JavaScript
├── properties.json     ← ⭐ ACÁ EDITÁS TODO (propiedades, fotos, precios)
├── vercel.json         ← Configuración de Vercel
└── README.md           ← Esta guía
```

---

## ⭐ Cómo editar propiedades (el "backend")

El archivo `properties.json` es tu panel de control.
**No necesitás saber programar.** Solo editá el texto.

### Estructura de cada propiedad:

```json
{
  "id": "studio-midtown-01",          ← ID único (no cambiar)
  "name": "Studio Moderno Midtown",   ← Nombre que se muestra
  "type": "studio",                   ← studio | 1br | 2br | 3br
  "zone": "Midtown East",             ← Zona del barrio
  "guests": "1–2",                    ← Capacidad de huéspedes
  "beds": 0,                          ← Cantidad de cuartos (0 = studio)
  "baths": 1,                         ← Baños
  "price": 120,                       ← Precio base (solo número)
  "amenities": ["WiFi", "A/C"],       ← Lista de comodidades
  "rules": "No fumar · ...",          ← Reglas del departamento
  "description": "Descripción...",    ← Texto descriptivo
  "highlight": "Alta demanda",        ← "" | "Alta demanda" | "Últimas fechas"
  "photos": [                         ← URLs de fotos (mínimo 1, ideal 3)
    "https://URL-foto-1.jpg",
    "https://URL-foto-2.jpg",
    "https://URL-foto-3.jpg"
  ],
  "active": true                      ← true = visible | false = oculto
}
```

### Para cambiar el precio:
Buscá la propiedad por nombre y cambiá el número en `"price": 120`

### Para cambiar fotos:
Subí tus fotos a cualquier servicio (Google Drive → link público, Imgur,
Cloudinary, etc.) y pegá la URL en el array `"photos"`.

### Para ocultar una propiedad temporalmente:
Cambiá `"active": true` por `"active": false`

### Para agregar una propiedad nueva:
Copiá un bloque completo, pegalo al final (antes del `]` final),
cambiá el `id` (debe ser único), y completá los datos.

### Para eliminar una propiedad:
Borrá todo su bloque `{ ... }` incluyendo la coma anterior.

---

## 🚀 Deploy en GitHub + Vercel (paso a paso)

### PASO 1 — Crear cuenta en GitHub
1. Andá a https://github.com
2. Hacé clic en "Sign up"
3. Creá una cuenta con tu email

### PASO 2 — Crear el repositorio
1. Una vez logueado, clic en el botón verde **"New"** (arriba a la izquierda)
2. En "Repository name" poné: `newyorkaparts`
3. Dejá en **Public**
4. Hacé clic en **"Create repository"**

### PASO 3 — Subir los archivos
En la página del repositorio recién creado:
1. Clic en **"uploading an existing file"** (link en el centro de la página)
2. Arrastrá todos los archivos del proyecto:
   - `index.html`
   - `style.css`
   - `main.js`
   - `properties.json`
   - `vercel.json`
3. Abajo, en "Commit changes", dejá el mensaje por defecto
4. Clic en **"Commit changes"** (botón verde)

### PASO 4 — Conectar con Vercel
1. Andá a https://vercel.com
2. Clic en **"Sign Up"** → elegí **"Continue with GitHub"**
3. Autorizá a Vercel para acceder a tu GitHub
4. En el dashboard de Vercel, clic en **"Add New Project"**
5. Buscá tu repositorio `newyorkaparts` y clic en **"Import"**
6. **No cambies nada** en la configuración que aparece
7. Clic en **"Deploy"**
8. Esperá ~1 minuto... ¡Listo! ✅

Vercel te va a dar una URL del tipo:
`https://newyorkaparts.vercel.app`

### PASO 5 (opcional) — Dominio propio
Si tenés o comprás un dominio (ej: `newyorkaparts.com`):
1. En Vercel, andá a tu proyecto → **"Settings"** → **"Domains"**
2. Escribí tu dominio y seguí las instrucciones para apuntar los DNS

---

## 🔄 Cómo actualizar el sitio (luego del deploy)

Cada vez que querés cambiar algo (precio, foto, agregar propiedad):

1. Andá a tu repositorio en GitHub: `github.com/TU-USUARIO/newyorkaparts`
2. Hacé clic en el archivo `properties.json`
3. Clic en el ícono del **lápiz ✏️** (arriba a la derecha del archivo)
4. Editá lo que necesitás
5. Abajo, clic en **"Commit changes"** (botón verde)
6. Vercel detecta el cambio automáticamente y actualiza el sitio en ~30 segundos

**¡No necesitás saber nada de código!**

---

## 📅 Disponibilidad con Google Sheets

El sitio no muestra el calendario directamente (porque lo manejan los dueños
internamente en Drive). Cuando un huésped consulta disponibilidad, se abre
WhatsApp y vos revisás la hoja de Drive para confirmar.

Si en el futuro querés mostrar el calendario públicamente, se puede hacer
conectando la Google Sheets API — avisame y lo implementamos.

---

## 📸 Dónde subir fotos

Opciones gratuitas para hospedar tus fotos:
- **Cloudinary** (recomendado): https://cloudinary.com — plan gratis generoso
- **Imgur**: https://imgur.com — muy fácil
- **Google Drive**: subís la foto → clic derecho → "Obtener enlace" → cambiar
  a "Cualquier persona con el enlace" → usar el link directo

---

## 📞 Soporte

WhatsApp: +1 352 260 0070
Instagram: @newyorkaparts
