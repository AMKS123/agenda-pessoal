// Service worker: permite instalar a agenda como app e abrir sem internet.
// Estratégia "rede primeiro": sempre tenta a versão nova do site; sem internet, usa a cópia guardada.
const CACHE = "agenda-v1";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icone-192.png", "./icone-512.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(nomes => Promise.all(nomes.filter(n => n !== CACHE).map(n => caches.delete(n)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Bibliotecas do Firebase: o endereço já tem a versão, então guarda e reaproveita (abre mais rápido e offline)
  if (url.hostname === "www.gstatic.com" && url.pathname.startsWith("/firebasejs/")) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(resp => {
      const copia = resp.clone();
      caches.open(CACHE).then(c => c.put(req, copia));
      return resp;
    })));
    return;
  }
  // Outros sites (login do Google, banco de dados) seguem direto pela rede
  if (url.origin !== location.origin) return;
  e.respondWith(
    fetch(req)
      .then(resp => {
        const copia = resp.clone();
        caches.open(CACHE).then(c => c.put(req, copia));
        return resp;
      })
      .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
  );
});
