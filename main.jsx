import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Heart, MessageCircle, Truck, Clock, MapPin, Camera, Sparkles, Star, Menu, X, Scale, ChefHat, Gift } from "lucide-react";
import './styles.css'

const WHATSAPP_NUMBERS = {
  principal: '5493624294313',
  alternativo: '5493624910570',
}

const INSTAGRAM_URL = 'https://instagram.com/somosbonelia'

const flavors = [
  { id: 'vainilla', nombre: 'Budín de Vainilla', carta: 'Vainilla Dorada', texto: 'Suave y delicado.', descripcion: 'Clásico, esponjoso y simple. Ideal para merienda, café o para regalar.', precio: '$ 3.000', clase: 'vainilla', items: ['300 g aprox.', 'Sabor clásico', 'Recién horneado'] },
  { id: 'limon', nombre: 'Budín de Limón', carta: 'Brisa de Limón', texto: 'Fresco y aromático.', descripcion: 'Budín húmedo de limón con glaseado blanco de jugo de limón, ralladura amarilla y 3 rodajas caramelizadas comestibles.', precio: '$ 3.500', clase: 'limon', items: ['Glaseado de limón', 'Ralladura amarilla', '3 rodajas caramelizadas'] },
  { id: 'chocolate', nombre: 'Budín de Chocolate', carta: 'Cacao Profundo', texto: 'Chocolate intenso.', descripcion: 'Budín de chocolate húmedo con chips por dentro y chips por arriba, chocolatoso sin exagerar.', precio: '$ 4.000', clase: 'chocolate', items: ['Con chips', 'Húmedo', 'Chocolate intenso'] },
  { id: 'frutos', nombre: 'Budín de Frutos Secos', carta: 'Tierra Dulce', texto: 'Con frutos secos seleccionados.', descripcion: 'Budín sabor vainilla con frutos secos por dentro, glaseado blanco y más frutos secos por encima.', precio: '$ 5.000', clase: 'frutos', items: ['Vainilla', 'Frutos secos', 'Glaseado blanco'] },
]

function whatsappLink(flavor = '', phone = WHATSAPP_NUMBERS.principal) {
  const text = flavor ? `Hola Bonelia 💕 quiero hacer un pedido de ${flavor}.\n\nNombre:\nCantidad:\nRetiro o envío:\nMedio de pago:` : `Hola Bonelia 💕 quiero hacer un pedido.\n\nNombre:\nSabor:\nCantidad:\nRetiro o envío:\nMedio de pago:`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

function Logo({ compact = false, word = true }) {
  return <div className={`brandLogo ${compact ? 'brandLogoCompact' : ''}`}><div className="boneliaMark"><span>B</span><i></i></div>{word && <div className="boneliaWord">BONELIA</div>}</div>
}

function Cake({ type = 'limon' }) {
  return <div className={`cakeScene ${type}`}><div className="plate"></div><div className="cakeLoaf"><div className="cakeBody"></div><div className="icing"></div>{type === 'limon' && <><div className="zest">{Array.from({length: 9}).map((_,i)=><b key={i}></b>)}</div><div className="lemonSlices"><span></span><span></span><span></span></div></>}{type === 'chocolate' && <div className="chips">{Array.from({length: 9}).map((_,i)=><b key={i}></b>)}</div>}{type === 'frutos' && <div className="nuts">{Array.from({length: 13}).map((_,i)=><b key={i}></b>)}</div>}{type === 'vainilla' && <div className="zest soft">{Array.from({length: 8}).map((_,i)=><b key={i}></b>)}</div>}</div></div>
}

function App() {
  const [selected, setSelected] = useState(flavors[1])
  const [menu, setMenu] = useState(false)
  return <main>
    <nav className="nav">
      <a href="#inicio" className="navBrand"><Logo compact word={false}/><span>BONELIA</span></a>
      <div className="navLinks"><a href="#sabores">Sabores</a><i></i><a href="#pedidos">Pedidos</a><i></i><a href="#contacto">Contacto</a></div>
      <a className="navButton" href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Hacer pedido</a>
      <button className="mobileBtn" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
    </nav>

    {menu && <div className="mobileMenu"><a onClick={()=>setMenu(false)} href="#sabores">Sabores</a><a onClick={()=>setMenu(false)} href="#pedidos">Pedidos</a><a onClick={()=>setMenu(false)} href="#contacto">Contacto</a></div>}

    <section id="inicio" className="hero section">
      <div className="botanical botLeft"></div><div className="botanical botRight"></div>
      <div className="heroText reveal">
        <div className="pill"><Sparkles size={17}/> Pedidos jueves y viernes · cupos limitados</div>
        <div className="heroLogo"><Logo word={true}/><div className="boutiqueLine"><span></span>PASTELERÍA BOUTIQUE<span></span></div></div>
        <h1>Budines artesanales recién horneados</h1>
        <p className="lead">Pequeños placeres para endulzar el día. Caseros, cercanos y con presentación cuidada.</p>
        <div className="actions"><a className="primary" href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={19}/> Hacer pedido</a><a className="secondary" href="#sabores">Ver sabores</a></div>
      </div>
      <div className="heroProduct reveal delay"><Cake type="limon"/></div>
      <div className="miniCards"><span><Scale/>300 g aprox.</span><span><ChefHat/>Hechos a pedido</span><span><MapPin/>Resistencia, Chaco</span></div>
    </section>

    <section id="sabores" className="section flavorsSection">
      <div className="botanical small left"></div><div className="botanical small right"></div>
      <div className="sectionTitle reveal"><small>SABORES</small><h2>La carta dulce de Bonelia</h2><p>Elegí tu sabor favorito y reservá por WhatsApp.</p></div>
      <div className="flavorGrid">{flavors.map((flavor, i) => <button key={flavor.id} onClick={() => setSelected(flavor)} className={`flavorCard reveal ${selected.id === flavor.id ? 'active' : ''}`} style={{animationDelay: `${i * .08}s`}}><Cake type={flavor.clase}/><h3>{flavor.carta}</h3><p>{flavor.texto}</p><strong>{flavor.precio}</strong></button>)}</div>
      <div className="selectedPanel reveal"><div className="selectedVisual"><Cake type={selected.clase}/></div><div className="selectedText"><small>Seleccionado</small><h2>{selected.carta}</h2><h3>{selected.nombre}</h3><p>{selected.descripcion}</p><div className="tags">{selected.items.map(item => <span key={item}>{item}</span>)}</div><div className="priceRow"><strong>{selected.precio}</strong><a className="primary" href={whatsappLink(selected.carta)} target="_blank" rel="noreferrer"><MessageCircle size={19}/> Pedir este sabor</a></div></div></div>
    </section>

    <section id="pedidos" className="section orderSection">
      <div className="botanical small left bottom"></div><div className="botanical small right bottom"></div>
      <div className="sectionTitle reveal"><small>PEDIDOS</small><h2>Simple, rápido y con cupos limitados</h2><p>La página está pensada para que el cliente te escriba sin vueltas.</p></div>
      <div className="steps">{[[Heart,'Elegí','Mirá los sabores disponibles.'],[MessageCircle,'Escribinos','El botón abre WhatsApp con el pedido armado.'],[Truck,'Coordinamos','Retiro en Parodi 236 o envío a coordinar.'],[Gift,'Disfrutá','Tu budín sale cuidado y fresco.']].map(([Icon,title,text], i) => <div className="step reveal" style={{animationDelay: `${i * .08}s`}} key={title}><em>{i+1}</em><Icon/><h3>{title}</h3><p>{text}</p></div>)}</div>
    </section>

    <section className="section ctaSection reveal"><div className="ctaCard"><Logo word={true}/><div><h2>Pedidos abiertos para el fin de semana</h2><p>Tomamos pedidos jueves y viernes. Los cupos son limitados para mantener la calidad.</p></div><div className="actions ctaActions"><a className="lightBtn" href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp principal</a><a className="lightBtn" href={whatsappLink('', WHATSAPP_NUMBERS.alternativo)} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp alternativo</a></div></div></section>

    <section id="contacto" className="footer section"><div className="contactBox"><div><MapPin/><strong>Resistencia, Chaco</strong><span>Parodi 236 · retiro o envío a coordinar</span></div><div><Clock/><strong>Pedidos</strong><span>Jueves y viernes</span></div><a className="contactLink" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><div><Camera/><strong>Instagram</strong><span>@somosbonelia</span></div></a></div><div className="reviews">{['Hechos con amor','Como en casa','Presentación cuidada'].map(t => <span key={t}><Star size={15}/>{t}</span>)}</div><p className="copyright">© 2026 Bonelia · Pastelería Boutique</p></section>
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
