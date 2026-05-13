import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Truck,
  Clock,
  MapPin,
  Camera,
  Sparkles,
  Star,
  Menu,
  X,
  Scale,
  ChefHat,
  Gift,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from "lucide-react";

import logoWordmark from "./assets/bonelia-wordmark.png";
import logoMark from "./assets/bonelia-mark.png";

import vainillaFoto from "./assets/vainilla.png";
import chocolateFoto from "./assets/chocolate.png";
import limonFoto from "./assets/limon.png";
import frutosFoto from "./assets/frutos-secos.png";
import marmoladoFoto from "./assets/marmolado.png";

import "./styles.css";

const WHATSAPP_NUMBERS = {
  principal: "5493624294313",
  alternativo: "5493624910570",
};

const INSTAGRAM_URL = "https://instagram.com/somosbonelia";

const flavors = [
  {
    id: "vainilla",
    nombre: "Budín de Vainilla",
    carta: "Vainilla Dorada",
    texto: "Suave y delicado.",
    descripcion:
      "Budín clásico de vainilla, suave, esponjoso y delicado, con terminación artesanal y azúcar impalpable.",
    precio: "$ 3.000",
    foto: vainillaFoto,
    items: ["300 g aprox.", "Sabor clásico", "Recién horneado"],
  },
  {
    id: "limon",
    nombre: "Budín de Limón",
    carta: "Brisa de Limón",
    texto: "Fresco y aromático.",
    descripcion:
      "Budín húmedo de limón con glaseado blanco de jugo de limón, ralladura amarilla y 3 rodajas caramelizadas comestibles.",
    precio: "$ 3.500",
    foto: limonFoto,
    items: ["Glaseado de limón", "Ralladura amarilla", "3 rodajas caramelizadas"],
  },
  {
    id: "chocolate",
    nombre: "Budín de Chocolate",
    carta: "Cacao Profundo",
    texto: "Chocolate intenso.",
    descripcion:
      "Budín de chocolate húmedo con chips por dentro y chips por arriba, chocolatoso sin exagerar.",
    precio: "$ 4.000",
    foto: chocolateFoto,
    items: ["Con chips", "Húmedo", "Chocolate intenso"],
  },
  {
    id: "frutos",
    nombre: "Budín de Frutos Secos",
    carta: "Tierra Dulce",
    texto: "Con frutos secos seleccionados.",
    descripcion:
      "Budín sabor vainilla con frutos secos por dentro, glaseado blanco y más frutos secos por encima.",
    precio: "$ 5.000",
    foto: frutosFoto,
    items: ["Vainilla", "Frutos secos", "Glaseado blanco"],
  },
  {
    id: "marmolado",
    nombre: "Budín Marmolado",
    carta: "Marmolado Bonelia",
    texto: "Vainilla y chocolate.",
    descripcion:
      "Budín marmolado de vainilla y chocolate, decorado con hilos artesanales de ganache de chocolate oscuro y chocolate blanco.",
    precio: "$ 5.000",
    foto: marmoladoFoto,
    items: ["Vainilla y chocolate", "Ganache artesanal", "Edición Bonelia"],
  },
];

const reviews = [
  "Riquísimo el de limonnn!! — Day",
  "Mortal, un lujo 👍 — Isidro",
  "Esta bien humedo, muy rico, me encantó — Meli.",
  "Es bien esponjoso y perfecto — Nahuel.",
  "El de chocolate no duró nada en casa! — Agus.",
  "El glaseado del limón es una locura 🤤 — Fer.",
  "Llegó hermoso, ideal para regalar. — Vero.",
  "Pedí para la merienda y fue un éxito total — Vale.",
  "Se siente artesanal posta, me encantó. — Luli."
];

function whatsappLink(flavor = "", phone = WHATSAPP_NUMBERS.principal) {
  const text = flavor
    ? `Hola Bonelia 💕 quiero hacer un pedido de ${flavor}.\n\nNombre:\nCantidad:\nRetiro o envío:\nMedio de pago:`
    : `Hola Bonelia 💕 quiero hacer un pedido.\n\nNombre:\nSabor:\nCantidad:\nRetiro o envío:\nMedio de pago:`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

function Logo({ compact = false, word = true }) {
  return (
    <div className={`realLogo ${compact ? "realLogoCompact" : ""}`}>
      <img className="realLogoMark" src={logoMark} alt="Bonelia" />
      {word && (
        <img
          className="realLogoWord"
          src={logoWordmark}
          alt="Bonelia Pastelería Boutique"
        />
      )}
    </div>
  );
}

function FlavorVisual({ flavor, featured = false }) {
  return (
    <div className={`photoCake ${featured ? "photoCakeFeatured" : ""}`}>
      <img src={flavor.foto} alt={flavor.nombre} />
    </div>
  );
}

function HeroCarousel({ items, onSelect }) {
  const [index, setIndex] = useState(4);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [paused, items.length]);

  const goTo = (nextIndex) => {
    const normalized = (nextIndex + items.length) % items.length;
    setIndex(normalized);
    onSelect(items[normalized]);
  };

  useEffect(() => {
    onSelect(items[index]);
  }, [index]);

  const current = items[index];

  return (
    <div
      className="heroCarousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="carouselImageWrap" key={current.id}>
        <img src={current.foto} alt={current.nombre} />
        <div className="carouselCaption">
          <small>Sabor destacado</small>
          <strong>{current.carta}</strong>
        </div>
      </div>

      <button className="carouselArrow carouselPrev" onClick={() => goTo(index - 1)} aria-label="Imagen anterior">
        <ChevronLeft size={22} />
      </button>

      <button className="carouselArrow carouselNext" onClick={() => goTo(index + 1)} aria-label="Imagen siguiente">
        <ChevronRight size={22} />
      </button>

      <button className="carouselPause" onClick={() => setPaused(!paused)} aria-label={paused ? "Reproducir carrusel" : "Pausar carrusel"}>
        {paused ? <Play size={17} /> : <Pause size={17} />}
      </button>

      <div className="carouselDots">
        {items.map((item, dotIndex) => (
          <button
            key={item.id}
            className={dotIndex === index ? "active" : ""}
            onClick={() => goTo(dotIndex)}
            aria-label={`Ver ${item.carta}`}
          />
        ))}
      </div>
    </div>
  );
}

function FloatingReviews() {
  return (
    <div className="reviewsCloud" aria-label="Comentarios de clientes">
      {reviews.map((review, index) => (
        <span key={review} className={`reviewBubble bubble${index + 1}`}>
          <Star size={15} />
          {review}
        </span>
      ))}
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(flavors[4]);
  const [menu, setMenu] = useState(false);

  return (
    <main>
      <nav className="nav">
        <a href="#inicio" className="navBrand">
          <Logo compact word={false} />
          <span>BONELIA</span>
        </a>

        <div className="navLinks">
          <a href="#sabores">Sabores</a>
          <i></i>
          <a href="#pedidos">Pedidos</a>
          <i></i>
          <a href="#contacto">Contacto</a>
        </div>

        <a className="navButton" href={whatsappLink()} target="_blank" rel="noreferrer">
          <MessageCircle size={18} /> Hacer pedido
        </a>

        <button className="mobileBtn" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </nav>

      {menu && (
        <div className="mobileMenu">
          <a onClick={() => setMenu(false)} href="#sabores">Sabores</a>
          <a onClick={() => setMenu(false)} href="#pedidos">Pedidos</a>
          <a onClick={() => setMenu(false)} href="#contacto">Contacto</a>
        </div>
      )}

      <section id="inicio" className="hero section">
  <div className="boneliaDecor heroFlower" aria-hidden="true">
    <img src="/decor/flower-blur-1.png" alt="" />
  </div>

  <div className="boneliaDecor heroPetals" aria-hidden="true">
    <img src="/decor/petals-soft-1.webp" alt="" />
  </div>

        <div className="heroText reveal">
          <div className="pill">
            <Sparkles size={17} /> Pedidos jueves y viernes · cupos limitados
          </div>

          <div className="heroLogo">
            <Logo word={true} />
          </div>

          <h1>Budines artesanales recién horneados</h1>
          <p className="lead">
            Budines artesanales preparados a pedido, con  clásicos, detalles cuidados y ese toque dulce que alegra el día.
          </p>

          <div className="actions">
            <a className="primary" href={whatsappLink()} target="_blank" rel="noreferrer">
              <MessageCircle size={19} /> Hacer pedido
            </a>
            <a className="secondary" href="#sabores">Ver sabores</a>
          </div>
        </div>

        <div className="heroProduct reveal delay">
          <HeroCarousel items={flavors} onSelect={setSelected} />
        </div>

        <div className="miniCards">
          <span><Scale />300 g aprox.</span>
          <span><ChefHat />Hechos a pedido</span>
          <span><MapPin />Resistencia, Chaco</span>
        </div>
      </section>

      <section id="sabores" className="section flavorsSection">
  <div className="boneliaDecor flavorsBranch" aria-hidden="true">
    <img src="/decor/botanical-branch-1.webp" alt="" />
  </div>

  <div className="boneliaDecor flavorsPetals" aria-hidden="true">
    <img src="/decor/petals-soft-2.webp" alt="" />
  </div>

        <div className="sectionTitle reveal">
          <small>SABORES</small>
          <h2>La carta dulce de Bonelia</h2>
          <p>Elegí tu sabor favorito y reservá por WhatsApp.</p>
        </div>

        <div className="flavorGrid">
          {flavors.map((flavor, i) => (
            <article
              key={flavor.id}
              className={`flavorCard reveal ${selected.id === flavor.id ? "active" : ""} withPhoto`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <button
                type="button"
                className="flavorSelect"
                onClick={() => setSelected(flavor)}
                aria-label={`Ver ${flavor.carta}`}
              >
                <FlavorVisual flavor={flavor} />
                <div className="flavorCardBody">
                  <h3>{flavor.carta}</h3>
                  <p>{flavor.texto}</p>
                  <strong>{flavor.precio}</strong>
                </div>
              </button>

              <a
                className="miniOrderButton"
                href={whatsappLink(flavor.carta)}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} /> Pedir
              </a>
            </article>
          ))}
        </div>

        <div className="selectedPanel reveal">
          <div className="selectedVisual">
            <FlavorVisual flavor={selected} featured />
          </div>

          <div className="selectedText">
            <small>Seleccionado</small>
            <h2>{selected.carta}</h2>
            <h3>{selected.nombre}</h3>
            <p>{selected.descripcion}</p>

            <div className="tags">
              {selected.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="priceRow">
              <strong>{selected.precio}</strong>
              <a className="primary" href={whatsappLink(selected.carta)} target="_blank" rel="noreferrer">
                <MessageCircle size={19} /> Pedir este sabor
              </a>
            </div>
          </div>
        </div>
      </section>

<section id="pedidos" className="section orderSection">
  <div className="boneliaDecor ordersFlower" aria-hidden="true">
    <img src="/decor/flower-blur-2.webp" alt="" />
  </div>

        <div className="sectionTitle reveal">
          <small>PEDIDOS</small>
          <h2>Reservá tu budín artesanal</h2>
          <p>Elegí el sabor, escribinos por WhatsApp y coordinamos retiro o envío.</p>
        </div>

        <div className="steps">
          {[
            [Heart, "Elegí", "Mirá los sabores disponibles."],
            [MessageCircle, "Escribinos", "Te respondemos para coordinar sabor, cantidad y entrega."],
            [Truck, "Coordinamos", "Retiro en Parodi 236 o envío a coordinar."],
            [Gift, "Disfrutá", "Tu budín sale cuidado y fresco."],
          ].map(([Icon, title, text], i) => (
            <div className="step reveal" style={{ animationDelay: `${i * 0.08}s` }} key={title}>
              <em>{i + 1}</em>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

<section className="section ctaSection reveal">
  <div className="ctaCard">
    <div className="boneliaDecor ctaBranch" aria-hidden="true">
      <img src="/decor/botanical-branch-2.webp" alt="" />
    </div>
          <Logo word={false} />

          <div>
            <h2>Pedidos abiertos para el fin de semana</h2>
            <p>Tomamos pedidos jueves y viernes. Los cupos son limitados para mantener la calidad.</p>
          </div>

          <div className="actions ctaActions">
            <a className="lightBtn" href={whatsappLink()} target="_blank" rel="noreferrer">
              <MessageCircle size={18} /> WhatsApp principal
            </a>
            <a
              className="lightBtn"
              href={whatsappLink("", WHATSAPP_NUMBERS.alternativo)}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={18} /> WhatsApp alternativo
            </a>
          </div>
        </div>
      </section>

<section id="contacto" className="footer section">
  <div className="boneliaDecor footerPetals" aria-hidden="true">
    <img src="/decor/petals-soft-1.webp" alt="" />
  </div>

  <div className="contactBox">
          <div>
            <MapPin />
            <strong>Resistencia, Chaco</strong>
            <span>Parodi 236 · retiro o envío a coordinar</span>
          </div>

          <div>
            <Clock />
            <strong>Pedidos</strong>
            <span>Jueves y viernes</span>
          </div>

          <a className="contactLink" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
            <div>
              <Camera />
              <strong>Instagram</strong>
              <span>@somosbonelia</span>
            </div>
          </a>
        </div>

        <FloatingReviews />

        <p className="copyright">© 2026 Bonelia · Pastelería Boutique</p>
      </section>

      <a className="floatingWhatsapp" href={whatsappLink()} target="_blank" rel="noreferrer">
        <MessageCircle size={20} /> Pedir
      </a>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
