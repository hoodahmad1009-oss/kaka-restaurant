
"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Phone,
  Menu as MenuIcon,
  X,
  ShoppingBag,
} from "lucide-react";
import ReservationForm from "./components/ReservationForm";

import OrderCart, { type CartItem } from "./components/OrderCart";

const phoneNumber = "923014846247";

const menuData = {
  Karahi: [
    { name: "Chicken Karahi", full: 1950, half: 1000 },
    { name: "Chicken White Karahi", full: 2200, half: 1100 },
    { name: "Chicken Boneless Karahi", full: 2200, half: 1100 },
    { name: "Chicken Achari Karahi", full: 2200, half: 1100 },
    { name: "Mutton Karahi", full: 4500, half: 2300 },
    { name: "Mutton White Karahi", full: 4800, half: 2500 },
    { name: "Beef Karahi", full: 2700, half: 1400 },
    { name: "Beef White Karahi", full: 2800, half: 1500 },
  ],
  Pakwan: [
    { name: "Kaka Special Daal Chana & Chicken", full: 490 },
    { name: "Daal Chana Fry", full: 380, half: 200 },
    { name: "Daal Mash Fry", full: 400, half: 220 },
    { name: "Karhi Pakora", full: 380, half: 200 },
    { name: "Beef Qorma", full: 600, half: 350 },
    { name: "Chicken Qorma", full: 550, half: 300 },
    { name: "Sabzi", full: 380, half: 200 },
    { name: "Special Chicken Biryani", full: 380 },
    { name: "Simple Biryani", full: 220 },
    { name: "Aloo Qeema / Aloo", full: 550, half: 300 },
    { name: "Lobia", full: 380, half: 200 },
    { name: "Aloo Anda", full: 380, half: 200 },
    { name: "Anda Kofta", full: 450, half: 250 },
    { name: "Kalay Chanay", full: 380, half: 200 },
    { name: "Bakray Ki Ojri", full: 550, half: 300 },
    { name: "Special Mutanjan", full: 350, half: 200 },
  ],
};

const galleryImages = [
  "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1000&q=85",
  "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85",
];

const mapsUrl =
  "https://share.google/QbXbQJ9HMkKuUzX5o";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<"Karahi" | "Pakwan">("Karahi");
  const [portion, setPortion] = useState<"full" | "half">("full");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const currentMenu = menuData[activeCategory];

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    "Assalam-o-Alaikum! I would like to enquire about Kaka Restaurant."
  )}`;

  const addToCart = (name: string, price: number) => {
    setCartItems((previous) => {
      const existing = previous.find((item) => item.name === name);

      if (existing) {
        return previous.map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { name, price, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const updateCartQuantity = (name: string, change: number) => {
    setCartItems((previous) =>
      previous
        .map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (name: string) => {
    setCartItems((previous) =>
      previous.filter((item) => item.name !== name)
    );
  };

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <main>
      <div className="topbar">
        <span><MapPin size={13} /> MULTAN ROAD, LAHORE</span>
        <span className="topbar-center">FAMILY RESTAURANT</span>
        <a href={`tel:+${phoneNumber}`}>
          <Phone size={13} /> 0301-4846247
        </a>
      </div>

      <header className="header">
        <a href="#home" className="brand" aria-label="Kaka home">
          <span className="brand-urdu">کاکا</span>
        </a>

        <nav className={mobileMenu ? "nav nav-open" : "nav"}>
          <a href="#home" onClick={() => setMobileMenu(false)}>HOME</a>
          <a href="#story" onClick={() => setMobileMenu(false)}>OUR STORY</a>
          <a href="#menu" onClick={() => setMobileMenu(false)}>MENU</a>
          <a href="#gallery" onClick={() => setMobileMenu(false)}>GALLERY</a>
          <a href="#contact" onClick={() => setMobileMenu(false)}>CONTACT</a>
        </nav>

        <a className="header-cta" href="#menu">
          EXPLORE MENU <ArrowUpRight size={15} />
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenu}
        >
          {mobileMenu ? <X /> : <MenuIcon />}
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-shade" />

        <div className="hero-content">
          <div className="hero-label">
            <span /> LAHORE'S DESI FOOD EXPERIENCE <span />
          </div>

          <div className="hero-logo">کاکا</div>

          <h1>
            ذائقہ جیہڑا
            <br />
            <em>دل جِت لے!</em>
          </h1>

          <p>
            ہر نوالے وچ اپنائیت، ہر ذائقے وچ پنجاب دی خوشبو۔
          </p>

          <div className="hero-actions">
            <a href="#menu" className="primary-btn">
              EXPLORE OUR MENU <ArrowRight size={17} />
            </a>
            <a href="#story" className="text-btn">
              DISCOVER KAKA <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="hero-bottom">
          <span>AUTHENTIC DESI FLAVOURS</span>
          <span>MADE FOR FAMILY & FRIENDS</span>
        </div>
      </section>

      <section className="intro section-wrap" id="story">
        <div className="intro-image">
          <img
            src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1100&q=85"
            alt="Traditional Pakistani food"
          />
          <div className="image-caption">MADE WITH DESI LOVE</div>
        </div>

        <div className="intro-copy">
          <span className="eyebrow">WELCOME TO KAKA</span>
          <h2>
            ذائقے دی گل
            <br />
            <em>ہی وکھری اے۔</em>
          </h2>
          <p>
            Kaka Family Restaurant brings the warmth of traditional
            Pakistani food to your table. From rich karahis to
            comforting desi favourites, every meal is an invitation
            to enjoy good food together.
          </p>
          <p className="urdu-line">
            ساڈے کول آؤ، ذائقے نال رشتہ بناؤ۔
          </p>
          <a href="#menu" className="under-link">
            EXPLORE OUR FOOD <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <section className="signature-section">
        <div className="signature-heading">
          <span className="eyebrow">STRAIGHT FROM OUR KITCHEN</span>
          <h2>ساڈے <em>خاص ذائقے</em></h2>
          <p>Desi favourites, prepared for unforgettable meals.</p>
        </div>

        <div className="signature-grid">
          <article className="signature-card signature-main">
            <img src={galleryImages[0]} alt="Chicken karahi" />
            <div className="signature-overlay">
              <span>01 / KAKA FAVOURITE</span>
              <h3>Chicken Karahi</h3>
              <a href="#menu">VIEW MENU <ArrowUpRight size={15} /></a>
            </div>
          </article>

          <article className="signature-card">
            <img src={galleryImages[1]} alt="Traditional curry" />
            <div className="signature-overlay">
              <span>02 / DESI CLASSIC</span>
              <h3>Traditional Qorma</h3>
              <a href="#menu">VIEW MENU <ArrowUpRight size={15} /></a>
            </div>
          </article>

          <article className="signature-card">
            <img src={galleryImages[2]} alt="Biryani" />
            <div className="signature-overlay">
              <span>03 / RICH & AROMATIC</span>
              <h3>Special Biryani</h3>
              <a href="#menu">VIEW MENU <ArrowUpRight size={15} /></a>
            </div>
          </article>
        </div>
      </section>

      <section className="menu-section section-wrap" id="menu">
        <div className="menu-heading">
          <span className="eyebrow">A TASTE FOR EVERYONE</span>
          <h2>Our <em>Menu</em></h2>
          <p>Choose your favourite and enjoy the taste of Kaka.</p>
        </div>

        <div className="menu-controls">
          <div className="category-tabs">
            {Object.keys(menuData).map((category) => (
              <button
                key={category}
                className={
                  activeCategory === category
                    ? "category-tab active"
                    : "category-tab"
                }
                onClick={() =>
                  setActiveCategory(category as "Karahi" | "Pakwan")
                }
              >
                {category === "Karahi"
                  ? "کڑاہی · KARAHI"
                  : "پکوان · PAKWAN"}
              </button>
            ))}
          </div>

          <div className="portion-tabs">
            <button
              className={portion === "full" ? "portion active" : "portion"}
              onClick={() => setPortion("full")}
            >
              FULL
            </button>
            <button
              className={portion === "half" ? "portion active" : "portion"}
              onClick={() => setPortion("half")}
            >
              HALF
            </button>
          </div>
        </div>

        <div className="menu-list">
          {currentMenu.map((item, index) => {
            const price = item[portion];

            return (
              <article className="menu-item" key={item.name}>
                <span className="menu-index">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="menu-item-name">
                  <h3>{item.name}</h3>
                  <span>FRESHLY PREPARED · KAKA KITCHEN</span>
                </div>

                <div className="menu-price">
                  {price ? (
                    <>Rs. {price.toLocaleString("en-PK")}</>
                  ) : (
                    <span className="price-unavailable">Not listed</span>
                  )}
                </div>

                <button
                  className="add-cart-btn"
                  disabled={!price}
                  onClick={() => addToCart(
                    `${item.name} (${portion === "full" ? "Full" : "Half"})`,
                    price!
                  )}
                >
                  <ShoppingBag size={15} />
                  ADD
                </button>
              </article>
            );
          })}
        </div>

        <p className="menu-note">
          Prices are based on the menu shared for this design preview.
          Please confirm current prices with the restaurant before ordering.
        </p>
      </section>

      <section className="quote-band">
        <span>✦</span>
        <h2>کھاؤ دل کھول کے، یاد رکھو کاکا نوں!</h2>
        <p>GOOD FOOD · GOOD COMPANY · GREAT MEMORIES</p>
        <span>✦</span>
      </section>

      <section className="gallery-section section-wrap" id="gallery">
        <div className="gallery-heading">
          <div>
            <span className="eyebrow">A LITTLE TASTE OF KAKA</span>
            <h2>Food worth <em>sharing.</em></h2>
          </div>
          <span className="gallery-side-note">THE KAKA EXPERIENCE / 01—04</span>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div
              className={`gallery-photo gallery-photo-${index + 1}`}
              key={image}
            >
              <img
                src={image}
                alt={`Restaurant food preview ${index + 1}`}
                loading="lazy"
              />
            </div>
          ))}
        </div>

        <p className="gallery-disclaimer">
          DESIGN PREVIEW IMAGES · REPLACE WITH KAKA RESTAURANT PHOTOS
        </p>
      </section>
<ReservationForm />
      <section className="contact-section" id="contact">
        <div className="contact-bg" />
        <div className="contact-content">
          <span className="eyebrow">COME HUNGRY, LEAVE HAPPY</span>
          <h2>
            چلو فیر،
            <br />
            <em>کاکے کول چلّیے!</em>
          </h2>
          <p>We would love to welcome you for a delicious meal.</p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="primary-btn"
          >
            <MapPin size={17} /> GET DIRECTIONS <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand">
            <span className="footer-urdu">کاکا</span>
            <p>ذائقہ جیہڑا دل جِت لے!</p>
          </div>

          <div className="footer-column">
            <h4>EXPLORE</h4>
            <a href="#story">Our Story</a>
            <a href="#menu">Our Menu</a>
            <a href="#gallery">Gallery</a>
          </div>

          <div className="footer-column">
            <h4>CONTACT</h4>
            <a href={`tel:+${phoneNumber}`}>0301-4846247</a>
            <a href="tel:+923014370005">0301-4370005</a>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              Multan Road, Lahore
            </a>
          </div>

          <div className="footer-column">
            <h4>FIND US</h4>
            <a href={mapsUrl} target="_blank" rel="noreferrer">
              <MapPin size={16} /> Directions
            </a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <Phone size={16} /> WhatsApp
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 KAKA FAMILY RESTAURANT</span>
          <span>MADE WITH DESI LOVE · LAHORE</span>
        </div>
      </footer>

      <OrderCart
        items={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        whatsappUrl={whatsappUrl}
      />

      <button
        className="floating-cart"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingBag size={19} />
        <span>MY ORDER</span>
        <strong>{cartCount}</strong>
      </button>

    </main>
  );
}
