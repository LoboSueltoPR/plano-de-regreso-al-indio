# De regreso al Indio — plano del predio

Plano interactivo del Parque Boronat para el domingo 18/10.

- Activá **Mover cosas** y arrastrá los sectores. Tocá un sector para cargar notas, responsable y emprendedores.
- Pestaña **Roles**: arrastrá cada nombre hasta su rol (con mouse o con el dedo), o tocá el nombre y después el rol. Soltarlo en «Personas» lo saca del rol.
- Con la planilla conectada, todos ven lo mismo: lo que se cambia en la página va a la planilla, y lo que se edita en la planilla aparece en la página en unos 10 segundos.

## Conectar la planilla de Google (una sola vez, ~5 minutos)

1. Creá una planilla vacía en Google Sheets (por ejemplo «Plano De regreso al Indio»).
2. **Extensiones → Apps Script**. Borrá lo que haya y pegá todo `apps-script/Codigo.gs`. Guardá.
3. Arriba, elegí la función **preparar** y tocá **Ejecutar**. Google pide permiso para que el script use la planilla: aceptá (si dice «Google no verificó esta app», entrá en *Configuración avanzada → Ir a…*). Se crean las pestañas `elementos`, `emprendedores`, `roles` y `personas` con lo que hay en `datos.js`.
4. **Implementar → Nueva implementación → tipo: Aplicación web**. Ejecutar como: **yo**. Quién tiene acceso: **Cualquier usuario**. Implementar y copiar la URL (termina en `/exec`).
5. Pegá esa URL en `config.js` (`PLANO_SHEETS_URL`) y, si querés el botón «Abrir planilla», el link de la planilla en `PLANO_SHEET_LINK`. Subí `config.js` al repo.

Si cambiás `Codigo.gs` después: **Implementar → Administrar implementaciones → editar → Nueva versión** (la URL sigue siendo la misma).

**Ojo:** cualquiera que tenga el link de la página puede editar la planilla a través de ella. Para un evento de un fin de semana alcanza; si hace falta, después se despublica la aplicación web.

## Editar en la planilla

- Cada pestaña es una lista; la columna `id` identifica cada fila. No la cambies en filas que ya existen. Una fila nueva sin `id` recibe uno sola.
- `roles`: la columna `personas` va separada por comas (`Fran, Guille`). `orden` define el orden en la página.
- `emprendedores`: `sector` es el `id` del sector (`puestos-mesa`, `puestos-gazebo`); `estado` es consultado / pendiente / confirmado.
- `elementos`: la posición y la forma (`x`, `y`, `rot`, `pts`…) conviene moverlas desde la página.

## Sin planilla

Si `config.js` no tiene URL, o la planilla no responde al abrir la página, todo funciona como antes: arranca con `datos.js` y los cambios quedan en el navegador de cada uno (**Descargar datos** baja un `datos.js` para reemplazar el del repo; **Plano original** vuelve a lo que dice `datos.js`).

Archivos: `index.html` (la página), `datos.js` (plano, emprendedores, roles y personas de arranque), `config.js` (URL de la planilla), `sheets-db.js` (lee y escribe la planilla), `local-db.js` (guardado en el navegador), `apps-script/Codigo.gs` (el script de la planilla), `mapa.svg` (mapa base, calles y caminos de OpenStreetMap).
