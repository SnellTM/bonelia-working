import { createRoot } from "react-dom/client";
import { useState } from "react";
import { Heart, MessageCircle, Truck, Clock, MapPin, Camera, Sparkles, PackageCheck, Star, Menu, X } from "lucide-react";
import './styles.css'

const WHATSAPP_NUMBERS = {
  principal: '5493624294313',
  alternativo: '5493624910570',
}

const flavors = [
  {
    id: 'vainilla',
    nombre: 'Budín de Vainilla',
    carta: 'Vainilla Dorada',
    texto: 'Suave y delicado.',
    descripcion: 'Clásico, esponjoso y simple. Ideal para merienda, café o para regalar.',
    precio: '$ 3.000',
    clase: 'vainilla',
    items: ['300 g aprox.', 'Sabor clásico', 'Recién horneado']
  },
  {
    id: 'limon',
    nombre: 'Budín de Limón',
    carta: 'Brisa de Limón',
    texto: 'Fresco y aromático.',
    descripcion: 'Budín húmedo de limón con glaseado blanco de jugo de limón, ralladura amarilla y 3 rodajas caramelizadas comestibles.',
    precio: '$ 3.500',
    clase: 'limon',
    items: ['Glaseado de limón', 'Ralladura amarilla', '3 rodajas caramelizadas']
  },
  {
    id: 'chocolate',
    nombre: 'Budín de Chocolate',
    carta: 'Cacao Profundo',
    texto: 'Chocolate intenso.',
    descripcion: 'Budín de chocolate húmedo con chips por dentro y chips por arriba, chocolatoso sin exagerar.',
    precio: '$ 4.000',
    clase: 'chocolate',
    items: ['Con chips', 'Húmedo', 'Chocolate intenso']
  },
  {
    id: 'frutos',
    nombre: 'Budín de Frutos Secos',
    carta: 'Tierra Dulce',
    texto: 'Con frutos secos seleccionados.',
    descripcion: 'Budín sabor vainilla con frutos secos por dentro, glaseado blanco y más frutos secos por encima.',
    precio: '$ 5.000',
    clase: 'frutos',
    items: ['Vainilla', 'Frutos secos', 'Glaseado blanco']
  },
]

function whatsappLink(flavor = '', phone = WHATSAPP_NUMBERS.principal) {
  const text = flavor
    ? `Hola Bonelia 💕 quiero hacer un pedido de ${flavor}.\n\nNombre:\nCantidad:\nRetiro o envío:\nMedio de pago:`
    : `Hola Bonelia 💕 quiero hacer un pedido.\n\nNombre:\nSabor:\nCantidad:\nRetiro o envío:\nMedio de pago:`
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
}

function Logo({ compact = false }) {
  return (
    <div className={`logo ${compact ? 'logoCompact' : ''}`}>
      <div className="logoMark"><span>B</span></div>
      {!compact && <div className="logoText">BONELIA</div>}
    </div>
  )
}

function Cake({ type = 'limon' }) {
  return (
    <div className={`cakeWrap ${type}`}>
      <div className="cake">
        <div className="glaze"></div>
        {type === 'limon' && <div className="lemonSlices"><span></span><span></span><span></span></div>}
        {type === 'chocolate' && <div className="chips">{Array.from({length: 14}).map((_,i)=><i key={i}></i>)}</div>}
        {type === 'frutos' && <div className="nuts">{Array.from({length: 13}).map((_,i)=><i key={i}></i>)}</div>}
        {type === 'vainilla' && <div className="vanillaSparkles">{Array.from({length: 10}).map((_,i)=><i key={i}></i>)}</div>}
      </div>
      <div className="slice"></div>
      <div className="shadow"></div>
    </div>
  )
}

function App() {
  const [selected, setSelected] = useState(flavors[1])
  const [menu, setMenu] = useState(false)

  return (
    <main>
      <nav className="nav">
        <a href="#inicio" className="navBrand"><Logo compact /><span>BONELIA</span></a>
        <div className="navLinks">
          <a href="#sabores">Sabores</a>
          <a href="#pedidos">Pedidos</a>
          <a href="#contacto">Contacto</a>
        </div>
        <a className="navButton" href={whatsappLink()} target="_blank">Pedir</a>
        <button className="mobileBtn" onClick={() => setMenu(!menu)}>{menu ? <X/> : <Menu/>}</button>
      </nav>

      {menu && (
        <div className="mobileMenu">
          <a onClick={()=>setMenu(false)} href="#sabores">Sabores</a>
          <a onClick={()=>setMenu(false)} href="#pedidos">Pedidos</a>
          <a onClick={()=>setMenu(false)} href="#contacto">Contacto</a>
        </div>
      )}

      <section id="inicio" className="hero section">
        <div className="decor decorLeft"></div>
        <div className="decor decorRight"></div>

        <div className="heroText reveal">
          <div className="pill">
            <Sparkles size={16}/> Pedidos jueves y viernes · cupos limitados
          </div>

          <Logo />

          <h1>Budines artesanales recién horneados</h1>

          <p className="lead">
            Pequeños placeres para endulzar el día. Caseros, cercanos y con presentación cuidada.
          </p>

          <div className="actions">
            <a className="primary" href={whatsappLink()} target="_blank">
              <MessageCircle size={19}/> Hacer pedido
            </a>

            <a className="secondary" href="#sabores">
              Ver sabores
            </a>
          </div>

          <div className="miniCards">
            <span>300 g aprox.</span>
            <span>Hechos a pedido</span>
            <span>Resistencia, Chaco</span>
          </div>
        </div>

        <div className="heroProduct reveal delay">
          <div className="productCard">
            <Cake type={selected.clase}/>
            <div className="productInfo">
              <small>Sabor destacado</small>
              <h3>{selected.carta}</h3>
              <p>{selected.texto}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="footer section">
        <Logo />
        <h2>BONELIA</h2>
        <p>Budines artesanales recién horneados</p>

        <div className="contactCards">
          <div>
            <MapPin/>
            <strong>Resistencia, Chaco</strong>
            <span>Parodi 236 · retiro o envío a coordinar</span>
          </div>

          <div>
            <Clock/>
            <strong>Pedidos</strong>
            <span>Jueves y viernes</span>
          </div>

          <div>
            <Camera/>
            <strong>Instagram</strong>
            <span>Próximamente</span>
          </div>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
