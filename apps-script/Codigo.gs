// De regreso al Indio: esta planilla es la base de datos del plano (index.html la lee y la escribe).
// Instalación: Extensiones → Apps Script, pegá este archivo, corré «preparar» una vez y publicalo
// como aplicación web (Ejecutar como: yo · Quién tiene acceso: cualquier usuario). Pasos en el README.
//
// Cada pestaña es una colección: la columna «id» identifica cada fila. Se puede editar a mano;
// una fila nueva sin id recibe uno solo. En «roles», la columna personas va separada por comas.

const COLUMNAS = {
  elementos: ["id", "num", "nombre", "responsable", "nota", "cupos", "recibe", "tipo", "color", "forma", "x", "y", "w", "h", "r", "rot", "escala", "contorno", "conectaA", "pts"],
  emprendedores: ["id", "nombre", "rubro", "contacto", "sector", "puesto", "estado", "luz", "notas", "creado"],
  roles: ["id", "orden", "rol", "personas", "que"],
  personas: ["id", "nombre"],
  tareas: ["id", "orden", "grupo", "tarea", "detalle", "personas", "hecho"],
};
const SI_NO = ["recibe", "contorno", "luz", "hecho"];
const NOMBRE_OK = /^[a-z]+$/; // pestañas que son listas de la página (otra lista nueva crea su pestaña sola)
const CACHE = "todo";

// Lo que había en datos.js cuando se armó el script: se usa solo si falta una pestaña.
const SEMILLA = {"elementos":{"tarima":{"tipo":"tarima","nombre":"Tarima","forma":"rect","x":383.6,"y":647.9,"w":85.6,"h":20,"rot":-25,"color":"#e5282e","num":1,"nota":"Tarima de menos de 1 m (no es escenario).\nScaramanzia a las 18 hs, unas 2 horas con presentación y palabras.\nArmado desde las 15 hs, desarme de 20 a 22 hs.","responsable":"Lobo (banda) · Charito (presentación)"},"gazebo-artistas":{"tipo":"gazebo","nombre":"Gazebo de los artistas","forma":"circle","x":415.5,"y":683.3,"r":11.4,"rot":0,"color":"#3aa63a","num":2,"nota":"Para Scaramanzia.\nAgua para la banda y la organización: 4 bidones, 2 dispensers, vasos.","responsable":"Pauli, Tino y Rope · gazebo: Tino"},"publico":{"tipo":"publico","nombre":"Público","forma":"poly","x":359.1,"y":553.5,"rot":0,"escala":1,"color":"#d6c63a","num":3,"nota":"Frente a la tarima, sobre el desnivel para ver mejor.\nSe esperan 80 a 100 personas. Público desde las 16 hs.\nTraé remera lisa para estampar. Sin venta de comida ni bebida.","responsable":"Cami M., José y Mari","pts":[[-56.6,-62.6],[24.5,-64.9],[30.2,-28.4],[50.7,0.2],[91.8,41.8],[-17.8,68.7],[-48,68.7],[-74.8,-23.8]]},"puestos-mesa":{"tipo":"puestos","nombre":"Puestos con mesa","forma":"rect","x":325.4,"y":473.8,"w":71.4,"h":14.3,"rot":-10,"color":"#6a1b5a","num":4,"cupos":8,"recibe":true,"nota":"Espacio de exposición y venta de productos culturales y merchandising.\nCada puesto trae su mesa. Sin venta de comida ni bebida.","responsable":"Luni, Lauti Rios, Nicky Polo y Lala"},"puestos-gazebo":{"tipo":"puestos","nombre":"Puestos con gazebo","forma":"rect","x":316.8,"y":426.4,"w":65.6,"h":16,"rot":-15,"color":"#2f3fcf","num":5,"cupos":6,"recibe":true,"nota":"Espacio de exposición y venta de productos culturales y merchandising.\nCada puesto trae su mesa. Sin venta de comida ni bebida.\nLos de gazebo van todos de este lado, atrás, para no tapar la tarima.","responsable":"Luni, Lauti Rios, Nicky Polo y Lala"},"banos":{"tipo":"banos","nombre":"Baños químicos","forma":"circle","x":486.9,"y":567.9,"r":13.7,"rot":0,"color":"#a565f0","num":6,"nota":"Dos baños químicos: uno accesible (con paso libre) y uno común.\nPapel higiénico, lavandina y guantes.","responsable":""},"trapo":{"tipo":"trapo","nombre":"Pintada del trapo","forma":"circle","x":268.3,"y":626.2,"r":14.3,"rot":0,"color":"#f08a1c","num":7,"nota":"Trapo homenaje pintado en el día.","responsable":""},"extintor-1":{"tipo":"extintor","nombre":"Extintor","forma":"rect","x":428.1,"y":623.9,"w":8,"h":8,"rot":0,"color":"#e5282e","contorno":true,"num":8,"nota":"En las puntas de la tarima. 5 kg ABC.","responsable":""},"extintor-2":{"tipo":"extintor","nombre":"Extintor","forma":"rect","x":340.2,"y":671.8,"w":8,"h":8,"rot":0,"color":"#e5282e","contorno":true,"num":8,"nota":"En las puntas de la tarima. 5 kg ABC.","responsable":""},"ambulancia":{"tipo":"ambulancia","nombre":"Ambulancia","forma":"rect","x":578.2,"y":671.8,"w":25,"h":13.7,"rot":0,"color":"#c8102e","contorno":true,"num":9,"nota":"Ramón y Cajal y Napostá, con salida directa.","responsable":""},"toma":{"tipo":"toma","nombre":"Toma de luz","forma":"circle","x":512.6,"y":639.3,"r":16,"rot":0,"color":"#22b5ec","num":10,"conectaA":"tarima","nota":"Objeto redondo junto a la ciclovía.\nCable a la tarima: cruza la ciclovía, va con cubrecable.","responsable":"Fran y Guille (sonido)"}},"emprendedores":{},"roles":{"presentacion":{"rol":"Presentación","que":"Conducir, presentar la banda, palabras del medio.","personas":"Charito","orden":1},"banda":{"rol":"Banda","que":"Contacto con Scaramanzia, horarios, qué necesitan.","personas":"Lobo","orden":2},"sonido":{"rol":"Sonido","que":"Qué pone la banda y qué ponemos nosotros.","personas":"Fran, Guille","orden":3},"cobertura":{"rol":"Cobertura","que":"Fotos y video del día y del previo.","personas":"Tyler, Tino","orden":4},"emprendedores":{"rol":"Emprendedores","que":"Formulario, puestos, mesa propia, ¿gazebo?","personas":"Luni, Lauti Rios, Nicky Polo, Lala, Clari","orden":5},"serigrafia":{"rol":"Serigrafía","que":"Remeras lisas y estampado en vivo.","personas":"Luni, Morita","orden":6},"gente":{"rol":"A cargo de la gente","que":"Recibir y orientar.","personas":"Cami M., José, Mari, Valen","orden":7},"catering":{"rol":"Catering de músicos","que":"Comida y bebida de banda y organización.","personas":"Pauli, Tino, Rope, ValenBau / Cala","orden":8},"armado":{"rol":"Armado y desarme","que":"Desde las 13 y hasta las 22.","personas":"Lala (solo armado), Charo, Zaira, Cami Álvarez, Mel, Juan","orden":9},"prensa":{"rol":"Prensa y difusión","que":"Mapa de actores, medios, afiches.","personas":"Guigui, Tony, Anto, COM","orden":10}},"personas":{"charito":{"nombre":"Charito"},"charo":{"nombre":"Charo"},"lobo":{"nombre":"Lobo"},"fran":{"nombre":"Fran"},"guille":{"nombre":"Guille"},"guigui":{"nombre":"Guigui"},"com":{"nombre":"COM"},"luni":{"nombre":"Luni"},"lauti-rios":{"nombre":"Lauti Rios"},"nicky-polo":{"nombre":"Nicky Polo"},"lala":{"nombre":"Lala"},"cami-m":{"nombre":"Cami M."},"cami-alvarez":{"nombre":"Cami Álvarez"},"jose":{"nombre":"José"},"mari":{"nombre":"Mari"},"pauli":{"nombre":"Pauli"},"tino":{"nombre":"Tino"},"rope":{"nombre":"Rope"},"zaira":{"nombre":"Zaira"},"mel":{"nombre":"Mel"},"juan":{"nombre":"Juan"},"valenbau-cala":{"nombre":"ValenBau / Cala"},"clari":{"nombre":"Clari"},"morita":{"nombre":"Morita"},"tony":{"nombre":"Tony"},"anto":{"nombre":"Anto"},"valen":{"nombre":"Valen"},"tyler":{"nombre":"Tyler"}},"tareas":{"gazebo":{"grupo":"Cosas a llevar","tarea":"Gazebo","detalle":"","personas":"Tino","hecho":false,"orden":1},"vasos":{"grupo":"Cosas a llevar","tarea":"Vasos x20 (local)","detalle":"","personas":"","hecho":false,"orden":2},"cafe-te":{"grupo":"Cosas a llevar","tarea":"Café y té (local)","detalle":"","personas":"","hecho":false,"orden":3},"tortas":{"grupo":"Cosas a llevar","tarea":"Tortas x3","detalle":"","personas":"","hecho":false,"orden":4},"bidones":{"grupo":"Cosas a llevar","tarea":"Bidones de agua x4","detalle":"","personas":"Tino","hecho":false,"orden":5},"dispenser":{"grupo":"Cosas a llevar","tarea":"Dispenser x2","detalle":"Buscar por lo de Rosa","personas":"Tino","hecho":false,"orden":6},"limpieza-banos-insumos":{"grupo":"Cosas a llevar","tarea":"Papel higiénico, lavandina y guantes (local)","detalle":"","personas":"","hecho":false,"orden":7},"mesa":{"grupo":"Cosas a llevar","tarea":"Mesa (local)","detalle":"","personas":"","hecho":false,"orden":8},"zapatilla":{"grupo":"Cosas a llevar","tarea":"Zapatilla (local)","detalle":"","personas":"","hecho":false,"orden":9},"lista-puestos":{"grupo":"Feriantes","tarea":"Confirmar la lista de puestos y armar el mapa orientativo","detalle":"","personas":"","hecho":false,"orden":10},"avisar-feriantes":{"grupo":"Feriantes","tarea":"Avisar horario de llegada y que traigan mesa propia","detalle":"","personas":"","hecho":false,"orden":11},"ubicar-puestos":{"grupo":"Feriantes","tarea":"Recibir y ubicar los puestos","detalle":"","personas":"","hecho":false,"orden":12},"limpieza-general":{"grupo":"Durante el evento","tarea":"Limpieza general","detalle":"Tachos y bolsas de basura","personas":"","hecho":false,"orden":13},"limpieza-banos":{"grupo":"Durante el evento","tarea":"Limpieza de baños químicos","detalle":"Lavandina, guantes y papel higiénico","personas":"","hecho":false,"orden":14},"recibir-gente":{"grupo":"Durante el evento","tarea":"Recibir a la gente y orientar","detalle":"","personas":"Cami M., José, Mari","hecho":false,"orden":15},"presentar":{"grupo":"Durante el evento","tarea":"Presentar la banda y decir las palabras","detalle":"","personas":"Charito","hecho":false,"orden":16}}};

function preparar() {
  Object.keys(COLUMNAS).forEach(c => hoja(c));
  CacheService.getScriptCache().remove(CACHE);
}

function doGet() {
  const cache = CacheService.getScriptCache();
  let txt = cache.get(CACHE);
  if (!txt) {
    txt = JSON.stringify(leerTodo());
    try { cache.put(CACHE, txt, 30); } catch (e) {}
  }
  return salida(txt);
}

function doPost(e) {
  let p;
  try { p = JSON.parse(e.postData.contents); } catch (err) { return salida(JSON.stringify({ ok: false, error: "Pedido inválido" })); }
  if (!NOMBRE_OK.test(String(p.col)) || !p.id || !["set", "update", "delete"].includes(p.accion)) return salida(JSON.stringify({ ok: false, error: "Pedido inválido" }));
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    escribir(p.col, String(p.id), p.accion, p.datos || {});
    CacheService.getScriptCache().remove(CACHE);
  } finally { lock.releaseLock(); }
  return salida(JSON.stringify({ ok: true }));
}

// Edición a mano en la planilla: que la página la vea en la próxima consulta.
function onEdit() { CacheService.getScriptCache().remove(CACHE); }

function salida(txt) { return ContentService.createTextOutput(txt).setMimeType(ContentService.MimeType.JSON); }

function hoja(col, conLock) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(col);
  if (sh) return sh;
  if (conLock) return crearHoja(ss, col);
  // Crear la pestaña con lock: si dos la piden a la vez, que no se dupliquen
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try { sh = ss.getSheetByName(col) || crearHoja(ss, col); } finally { lock.releaseLock(); }
  return sh;
}

function crearHoja(ss, col) {
  const sh = ss.insertSheet(col);
  const cab = COLUMNAS[col] || ["id"];
  sh.getRange(1, 1, 1, cab.length).setValues([cab]).setFontWeight("bold");
  sh.setFrozenRows(1);
  const filas = Object.entries(SEMILLA[col] || {}).map(([id, d]) => cab.map(c => (c === "id" ? id : aCelda(d[c]))));
  if (filas.length) escribirFilas(sh.getRange(2, 1, filas.length, cab.length), filas);
  cab.forEach((c, j) => {
    if (SI_NO.includes(c)) sh.getRange(2, j + 1, 300).setDataValidation(SpreadsheetApp.newDataValidation().requireCheckbox().build());
    if (col === "emprendedores" && c === "estado") sh.getRange(2, j + 1, 300).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(["consultado", "pendiente", "confirmado"]).build());
  });
  return sh;
}

function leerTodo() {
  const out = {};
  Object.keys(COLUMNAS).forEach(c => hoja(c));
  SpreadsheetApp.getActiveSpreadsheet().getSheets().forEach(sh => {
    const col = sh.getName();
    if (!NOMBRE_OK.test(col)) return;
    out[col] = {};
    const v = sh.getDataRange().getValues();
    if (v.length < 2) return;
    const cab = v[0].map(c => String(c).trim());
    const k = cab.indexOf("id");
    if (k < 0) return;
    v.slice(1).forEach((f, i) => {
      let id = String(f[k]).trim();
      if (!id) {
        if (!f.some(x => x !== "" && x !== false)) return; // fila vacía
        id = darId(sh, i + 2, k + 1);
        if (!id) return;
      }
      const d = {};
      cab.forEach((c, j) => { if (c && c !== "id") { const x = deCelda(c, f[j]); if (x !== undefined) d[c] = x; } });
      out[col][id] = d;
    });
  });
  return out;
}

// Fila cargada a mano sin id: ponerle uno (con lock, por si dos leen a la vez).
function darId(sh, fila, colId) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return "";
  try {
    const celda = sh.getRange(fila, colId);
    let id = String(celda.getValue()).trim();
    if (!id) { id = Utilities.getUuid().slice(0, 8); celda.setNumberFormat("@").setValue(id); }
    return id;
  } finally { lock.releaseLock(); }
}

function escribir(col, id, accion, datos) {
  const sh = hoja(col, true);
  const cab = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(c => String(c).trim());
  let k = cab.indexOf("id");
  if (k < 0) { cab.unshift("id"); sh.insertColumnBefore(1); sh.getRange(1, 1).setValue("id").setFontWeight("bold"); k = 0; }
  const n = sh.getLastRow() - 1;
  const ids = n > 0 ? sh.getRange(2, k + 1, n, 1).getValues().map(r => String(r[0]).trim()) : [];
  const i = ids.indexOf(id);

  if (accion === "delete") { if (i >= 0) sh.deleteRow(i + 2); return; }

  Object.keys(datos).forEach(c => {
    if (c !== "id" && !cab.includes(c)) { cab.push(c); sh.getRange(1, cab.length).setValue(c).setFontWeight("bold"); }
  });

  if (i >= 0 && accion === "update") {
    Object.keys(datos).forEach(c => { if (c !== "id") escribirFilas(sh.getRange(i + 2, cab.indexOf(c) + 1), [[aCelda(datos[c])]]); });
    return;
  }
  let fila = i + 2;
  if (i < 0) { let ult = -1; ids.forEach((x, j) => { if (x) ult = j; }); fila = ult + 3; }
  escribirFilas(sh.getRange(fila, 1, 1, cab.length), [cab.map(c => (c === "id" ? id : aCelda(datos[c])))]);
}

// Textos como texto (que "18/10" no se vuelva fecha ni "+54…" un número).
function escribirFilas(rango, filas) {
  rango.setNumberFormats(filas.map(f => f.map(v => (typeof v === "string" ? "@" : "General"))));
  rango.setValues(filas);
}

function aCelda(v) {
  if (v === undefined || v === null) return "";
  if (typeof v === "object") return JSON.stringify(v);
  if (typeof v === "string" && /^[=+]/.test(v)) return "'" + v; // nunca una fórmula
  return v;
}

function deCelda(c, v) {
  if (v === "" || v === null) return undefined;
  if (v instanceof Date) return Utilities.formatDate(v, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm");
  if (SI_NO.includes(c) && typeof v === "string") return /^(s[ií]|x|true|verdadero|1)$/i.test(v.trim());
  if (typeof v === "string") {
    const t = v.trim();
    if ((t[0] === "[" && t.endsWith("]")) || (t[0] === "{" && t.endsWith("}"))) { try { return JSON.parse(t); } catch (e) {} }
  }
  return v;
}
