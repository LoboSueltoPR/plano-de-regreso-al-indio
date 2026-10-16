// Guarda el plano sin servidor: arranca con datos.js y los cambios quedan en este navegador.
// Imita la parte de la base de datos que usa la página (collection / doc / onSnapshot / set / update / delete).
(function () {
  const CLAVE = "plano-de-regreso-al-indio";
  const clonar = o => JSON.parse(JSON.stringify(o));
  const original = () => {
    const d = clonar(window.DATOS_PLANO || {});
    return { elementos: d.elementos || {}, emprendedores: d.emprendedores || {} };
  };

  let estado = null;
  try { estado = JSON.parse(localStorage.getItem(CLAVE)); } catch (e) {}
  if (!estado || typeof estado.elementos !== "object") estado = original();
  estado.emprendedores ||= {};

  const subs = { elementos: [], emprendedores: [] };
  function guardar() { try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) {} }
  function foto(col) {
    return { docs: Object.entries(estado[col] || {}).map(([id, d]) => ({ id, exists: true, data: () => d })) };
  }
  function avisar(col) { (subs[col] || []).forEach(f => f(foto(col))); }
  function avisarTodo() { Object.keys(subs).forEach(avisar); }

  let n = 0;
  const nuevoId = () => Date.now().toString(36) + (++n).toString(36) + Math.random().toString(36).slice(2, 6);

  function doc(col, id) {
    id = id || nuevoId();
    estado[col] ||= {};
    return {
      id,
      async set(d) { estado[col][id] = clonar(d); guardar(); avisar(col); },
      async update(d) { estado[col][id] = { ...(estado[col][id] || {}), ...clonar(d) }; guardar(); avisar(col); },
      async delete() { delete estado[col][id]; guardar(); avisar(col); },
    };
  }
  const db = {
    collection: col => ({
      doc: id => doc(col, id),
      onSnapshot(f) { (subs[col] ||= []).push(f); setTimeout(() => f(foto(col)), 0); return () => {}; },
    }),
    doc: ruta => { const [col, id] = ruta.split("/"); return doc(col, id); },
  };

  // Otra pestaña del mismo navegador cambió algo: traerlo.
  window.addEventListener("storage", ev => {
    if (ev.key !== CLAVE) return;
    try { estado = JSON.parse(ev.newValue) || original(); } catch (e) { estado = original(); }
    avisarTodo();
  });

  window.planoLocal = {
    descargar() {
      const txt = "window.DATOS_PLANO = " + JSON.stringify(estado, null, 2) + ";\n";
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([txt], { type: "text/javascript" }));
      a.download = "datos.js";
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    },
    restaurar() { estado = original(); guardar(); avisarTodo(); },
  };
  window.claude = { use: async k => (k === "db" ? db : k === "user" ? { can: async () => true } : null) };
})();
