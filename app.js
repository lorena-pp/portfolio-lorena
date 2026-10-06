/* ============ 5. DATA: edit here, nothing else needs to change ============ */

const DATA = {
  role: "Estudiante de Ingeniería del Software",
  school: "ETSISI, Universidad Politécnica de Madrid",
  about: "Me interesa entender cómo funcionan las cosas, no solo hacer que funcionen. Disfruto aprendiendo tecnologías nuevas y buscando formas más simples y elegantes de resolver problemas. Destaco por mi capacidad de comunicación y por desenvolverme con facilidad en entornos colaborativos.",
  experience: [
    { title: "Subdelegada de Comunicación, Delegación de Alumnos de la ETSISI", text: "Redacción, elaboración y difusión de contenidos informativos y gráficos en redes sociales y canales internos." },
    { title: "Voluntaria en Fundación Kyrios", text: "Pedagogía y enseñanza de aplicaciones móviles." },
    { title: "Participación en hackatons", text: "CodeBoost y Hackathon de Next Digital." },
    { title: "Participación en hackatons", text: "CodeBoost y Hackathon de Next Digital." }
  ],
  education: [
    { title: "Universidad Politécnica de Madrid", text: "2023 - presente" },
    { title: "The English Montessori School", text: "2008 - 2023" }
  ],
  languages: ["Español nativo", "Inglés C2", "Francés B1"],
  tech: ["Java", "Python", "JavaScript", "HTML", "CSS", "Git"],
  skills: ["Gestión ágil de tareas", "Adaptabilidad", "Escucha activa", "Comunicación clara y técnica", "Aprendizaje metacognitivo"],
  projects: [
    { tag: "Java", title: "Juego de cartas digital", text: "Desarrollado en pareja, aplicando principios de programación orientada a objetos." },
    { tag: "Comunicación", title: "Comunicación de la Delegación de Alumnos", text: "Contenidos informativos y gráficos para redes sociales y canales internos de la ETSISI." }
  ],
  interests: [
    { title: "Lu", text: "Mi perrita. Aparece en más fotos de mi móvil que yo." },
    { title: "Parques de atracciones", text: "Cuanto más alta y rápida la montaña rusa, mejor." },
    { title: "Series", text: "Riverdale, Merlí y Ted Lasso." }
  ],
  resources: [],
  events: [
    { tag: "Hackathon", title: "CodeBoost", text: "Participé como parte de un equipo." },
    { tag: "Hackathon", title: "Hackathon de Next Digital", text: "Participé como parte de un equipo." }
  ],
  contact: [
    { label: "lorenappff@gmail.com", href: "mailto:lorenappff@gmail.com" },
    { label: "github.com/lorena-pp", href: "https://github.com/lorena-pp" }
  ]
};

/* ============ 6. VIEW HELPERS ============ */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const chips = items => `<ul class="chips">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`;
const timeline = items => `<ul class="timeline">${items.map(i => `<li><h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></li>`).join("")}</ul>`;
const cards = items => `<div class="grid">${items.map(i => `<article class="card">${i.tag ? `<span class="tag">${esc(i.tag)}</span>` : ""}<h3>${esc(i.title)}</h3><p>${esc(i.text)}</p></article>`).join("")}</div>`;
const empty = msg => `<p class="empty">${msg}</p>`;
const header = (title, lead) => `<h1 class="page-title">${title}</h1><p class="lead">${lead}</p>`;

/* ============ 7. VIEWS ============ */

const ROUTES = {
  "": { label: "Inicio", title: "Lorena Peñas", scene: { x: .55, y: .05, s: 1.15, hue: .78 },
    render: () => `
      <section class="hero"><h1><span>Lorena</span><span>Peñas</span></h1>
        <p class="role">${esc(DATA.role)}.<br>${esc(DATA.school)}.</p></section>
      <section class="block"><h2>Sobre mí</h2><p>${esc(DATA.about)}</p></section>
      <section class="block two">
        <div><h2>Experiencia</h2>${timeline(DATA.experience)}</div>
        <div><h2>Educación</h2>${timeline(DATA.education)}</div></section>
      <section class="block two">
        <div><h2>Tecnologías</h2>${chips(DATA.tech)}</div>
        <div><h2>Idiomas</h2>${chips(DATA.languages)}</div></section>
      <section class="block"><h2>Habilidades</h2>${chips(DATA.skills)}</section>` },
  proyectos: { label: "Proyectos", title: "Proyectos", scene: { x: -.6, y: -.1, s: .8, hue: .9 },
    render: () => header("Proyectos", "Lo que he construido y en lo que he trabajado.") + cards(DATA.projects) },
  intereses: { label: "Intereses", title: "Intereses", scene: { x: .6, y: .2, s: .9, hue: .6 },
    render: () => header("Intereses", "Lo que hay fuera del código.") + cards(DATA.interests) },
  recursos: { label: "Recursos", title: "Recursos", scene: { x: -.5, y: .15, s: 1, hue: .7 },
    render: () => header("Recursos", "Apuntes y documentación de la carrera, para compartir.") +
      (DATA.resources.length ? cards(DATA.resources) : empty("Aún no hay recursos publicados. Añade el primero en <code>DATA.resources</code>.")) },
  eventos: { label: "Eventos", title: "Eventos", scene: { x: .5, y: -.15, s: .85, hue: .95 },
    render: () => header("Eventos", "Actividades a las que he asistido.") + cards(DATA.events) },
  contacto: { label: "Contacto", title: "Contacto", scene: { x: 0, y: .35, s: 1.4, hue: .82 },
    render: () => header("Contacto", "Escríbeme o échale un vistazo a mi código.") +
      `<div class="block">${DATA.contact.map(c => `<a class="big-link" href="${esc(c.href)}">${esc(c.label)}</a>`).join("")}</div>` }
};

/* ============ 8. ROUTER ============ */

const Router = {
  view: document.getElementById("view"),
  init() {
    document.getElementById("menu").innerHTML = Object.entries(ROUTES)
      .map(([k, r]) => `<li><a href="#/${k}" data-route="${k}">${r.label}</a></li>`)
      .join("");
    addEventListener("hashchange", () => this.go());
    this.go();
  },
  current() {
    const key = location.hash.replace(/^#\/?/, "");
    return key in ROUTES ? key : "";
  },
  go() {
    const key = this.current(), route = ROUTES[key];
    this.view.classList.add("leaving");
    setTimeout(() => {
      this.view.innerHTML = route.render();
      this.view.classList.remove("leaving");
      document.title = route.title === "Lorena Peñas" ? route.title : `${route.title} | Lorena Peñas`;
      document.querySelectorAll("[data-route]").forEach(a =>
        a.dataset.route === key ? a.setAttribute("aria-current", "page") : a.removeAttribute("aria-current"));
      scrollTo(0, 0); this.view.focus({ preventScroll: true });
      Scene.target(route.scene);
    }, matchMedia("(prefers-reduced-motion:reduce)").matches ? 0 : 220);
  }
};

/* ============ 9. 3D SCENE: a blob that reacts to the cursor and to each page ============ */

const Scene = (() => {
  const canvas = document.getElementById("scene");
  if (!window.THREE) return { target() {} };
  const still = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  const cam = new THREE.PerspectiveCamera(45, 1, .1, 50); cam.position.z = 6;
  const scene = new THREE.Scene();
  const geo = new THREE.IcosahedronGeometry(1.5, 18);
  const base = geo.attributes.position.array.slice();
  const mat = new THREE.MeshStandardMaterial({ roughness: .25, metalness: .15 });
  const blob = new THREE.Mesh(geo, mat); scene.add(blob);
  const key = new THREE.PointLight(0xff7ab3, 2.2, 0); key.position.set(4, 3, 5);
  scene.add(key, new THREE.AmbientLight(0xffffff, .6));
  const goal = { x: 0, y: 0, s: 1, hue: .78 }, now = { x: 0, y: 0, s: 1, hue: .78 }, mouse = { x: 0, y: 0 };
  const color = new THREE.Color();

  function resize() {
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(innerWidth, innerHeight, false);
    cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix();
  }
  function warp(t) {  // cheap layered-sine displacement, no noise library needed
    const p = geo.attributes.position.array;
    for (let i = 0; i < p.length; i += 3) {
      const x = base[i], y = base[i + 1], z = base[i + 2];
      const d = 1 + .16 * Math.sin(x * 2.1 + t) * Math.cos(y * 2.4 + t * .8) + .1 * Math.sin(z * 3 + t * 1.3);
      p[i] = x * d; p[i + 1] = y * d; p[i + 2] = z * d;
    }
    geo.attributes.position.needsUpdate = true; geo.computeVertexNormals();
  }
  function frame(ms) {
    const t = ms / 1000, k = .05, narrow = innerWidth < 700;
    for (const a of ["x", "y", "s", "hue"]) now[a] += (goal[a] - now[a]) * k;
    blob.position.set(narrow ? 0 : now.x * 2.4, now.y * 1.6, 0);
    blob.scale.setScalar(now.s * (narrow ? .6 : 1));
    blob.rotation.y += (mouse.x * .8 - blob.rotation.y) * .04;
    blob.rotation.x += (-mouse.y * .5 - blob.rotation.x) * .04;
    mat.color.copy(color.setHSL(now.hue, .75, .62));
    warp(t);
    renderer.render(scene, cam);
    if (!still) requestAnimationFrame(frame);
  }
  addEventListener("resize", () => { resize(); if (still) frame(0); });
  addEventListener("pointermove", e => { mouse.x = e.clientX / innerWidth * 2 - 1; mouse.y = e.clientY / innerHeight * 2 - 1; });
  resize(); requestAnimationFrame(frame);
  return { target(t) { Object.assign(goal, t); if (still) Object.assign(now, t); } };
})();

/* ============ 10. THEME TOGGLE ============ */

document.getElementById("theme").addEventListener("click", () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme:dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
});

Router.init();