// Usa una planilla de Google como base de datos, a través del script de apps-script/Codigo.gs.
// Misma forma que local-db.js (collection / doc / onSnapshot / set / update / delete).
// Sin URL en config.js, o si la planilla no responde al abrir, sigue andando local-db.js.
(function () {
  const URL_APP = window.PLANO_SHEETS_URL;
  if (!URL_APP) return;
  const CADA = 10000; // cada cuánto se trae lo que cambiaron los demás
  const local = window.claude;
  const clonar = o => JSON.parse(JSON.stringify(o));

  let estado = {}, ultimo = {}; // ultimo: JSON por colección, para avisar solo si cambió
  const subs = {};
  let pendientes = 0, version = 0, timer = null, enCurso = false, cola = Promise.resolve();

  function foto(col) {
    return { docs: Object.entries(estado[col] || {}).map(([id, d]) => ({ id, exists: true, data: () => d })) };
  }
  function avisar(col) { (subs[col] || []).forEach(f => f(foto(col))); }

  async function pedir() {
    const r = await fetch(URL_APP + (URL_APP.includes("?") ? "&" : "?") + "t=" + Date.now());
    if (!r.ok) throw new Error("La planilla respondió " + r.status);
    const d = await r.json();
    if (!d || typeof d.elementos !== "object") throw new Error("La planilla no devolvió datos del plano");
    return d;
  }
  function aplicar(d) {
    window.planoSheets.cols = Object.keys(d);
    Object.keys(d).forEach(col => {
      const txt = JSON.stringify(d[col]);
      if (txt === ultimo[col]) return;
      ultimo[col] = txt; estado[col] = d[col]; avisar(col);
    });
  }
  function programar(ms) {
    clearTimeout(timer);
    if (!document.hidden) timer = setTimeout(consultar, ms ?? CADA);
  }
  async function consultar() {
    if (enCurso) return;
    enCurso = true;
    const v = version;
    try {
      const d = await pedir();
      // Si algo se escribió mientras tanto, esta foto ya es vieja: esperar la próxima.
      if (!pendientes && v === version) aplicar(d);
    } catch (e) { console.warn("[planilla]", e); }
    finally { enCurso = false; programar(); }
  }
  document.addEventListener("visibilitychange", () => programar(300));

  // Escrituras de a una, en orden; la página ve el cambio al instante y la planilla lo confirma.
  function escribir(accion, col, id, datos) {
    version++; pendientes++;
    const p = cola.then(async () => {
      const r = await fetch(URL_APP, { method: "POST", body: JSON.stringify({ accion, col, id, datos }) });
      const res = await r.json();
      if (!res.ok) throw new Error(res.error || "La planilla no guardó el cambio");
    });
    cola = p.catch(() => {});
    return p.finally(() => { pendientes--; version++; programar(1500); });
  }
  function cambiarLocal(col, f) {
    estado[col] = { ...(estado[col] || {}) };
    f(estado[col]);
    ultimo[col] = JSON.stringify(estado[col]);
    avisar(col);
  }

  let n = 0;
  const nuevoId = () => Date.now().toString(36) + (++n).toString(36) + Math.random().toString(36).slice(2, 6);
  function doc(col, id) {
    id = id || nuevoId();
    return {
      id,
      set(d) { cambiarLocal(col, c => { c[id] = clonar(d); }); return escribir("set", col, id, d); },
      update(d) { cambiarLocal(col, c => { c[id] = { ...(c[id] || {}), ...clonar(d) }; }); return escribir("update", col, id, d); },
      delete() { cambiarLocal(col, c => { delete c[id]; }); return escribir("delete", col, id); },
    };
  }
  const db = {
    modo: "planilla",
    collection: col => ({
      doc: id => doc(col, id),
      onSnapshot(f) { (subs[col] ||= []).push(f); setTimeout(() => f(foto(col)), 0); return () => {}; },
    }),
    doc: ruta => { const [col, id] = ruta.split("/"); return doc(col, id); },
  };

  window.planoSheets = { link: window.PLANO_SHEET_LINK || "", fallo: false, cols: [] };
  let listo = null;
  window.claude = {
    use: async k => {
      if (k === "user") return { can: async () => true };
      if (k !== "db") return null;
      listo ||= pedir().then(
        d => { aplicar(d); programar(); return db; },
        e => { console.warn("[planilla]", e); window.planoSheets.fallo = true; return local ? local.use("db") : null; }
      );
      return listo;
    },
  };
})();
