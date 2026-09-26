// Temporary QA Fixtures OUTSIDE production theme source
// Matches locked Stitch screens 9dcd6121d0fc448784bd01e1a5ec7f28 & 393f90a8b8c5471e9e171b3c9dbf733b

const logoUrl = '/assets/logo.svg';

const product1_images = [
  '/assets/preview/fluted-pedestal-table-main.jpg',
  '/assets/preview/fluted-pedestal-table-detail.jpg',
  '/assets/preview/fluted-pedestal-table-salon.jpg',
  '/assets/preview/fluted-pedestal-table-macro.jpg',
  '/assets/preview/fluted-pedestal-table-scale.jpg'
];

const product1 = {
  id: 1,
  title: 'Aurelle Fluted Marble Pedestal Table',
  type: 'Side & Accent Tables',
  vendor: 'Maison Aurelle Atelier',
  description: '<p>Hand-fluted solid Carrara marble column elevated by brushed antique satin brass detailing. Dimensionally calibrated to fit comfortably alongside classic and contemporary living arrangements without overpowering the room.</p>',
  url: '/products/aurelle-fluted-marble-pedestal-table',
  price: 16500,
  compare_at_price: null,
  available: true,
  has_only_default_variant: false,
  featured_media: {
    src: product1_images[0],
    alt: 'Aurelle Fluted Marble Pedestal Table'
  },
  media: product1_images.map((src, i) => ({
    src,
    alt: `Aurelle Fluted Marble Pedestal Table view ${i + 1}`
  })),
  variants: [
    {
      id: 101,
      title: 'Honed Carrara White / Brushed Brass',
      price: 16500,
      sku: 'MAR-8820-WH',
      available: true,
      featured_image: { src: '/assets/preview/table-variant-carrara.jpg' }
    },
    {
      id: 102,
      title: 'Nero Marquina / Antiqued Bronze',
      price: 16500,
      sku: 'MAR-8820-BK',
      available: true,
      featured_image: { src: '/assets/preview/fluted-pedestal-table-salon.jpg' }
    },
    {
      id: 103,
      title: 'Calacatta Warm Amber / Satin Brass',
      price: 16500,
      sku: 'MAR-8820-AM',
      available: true,
      featured_image: { src: '/assets/preview/fluted-pedestal-table-main.jpg' }
    }
  ],
  metafields: {
    custom: {
      curatorial_label: 'Flagship Edition',
      configuration_note: 'Standard Accent — 45cm Ø × 52cm H',
      dimensions_profile: 'Diameter: 45 cm (17.7 in) • Height: 52 cm (20.5 in) • Net Weight: 18.4 kg (40.5 lbs) • Base Footprint: 28 cm Ø (11.0 in). Intended for living salons, bedside placement, and reading salons.',
      materials_construction: 'Solid Honed Carrara Marble column with micro-beveled fluting. Brushed satin brass alloy trim with protective matte lacquer seal. Weighted cast base core with protective high-density wool-felt footing.',
      whats_included: '1× Fluted marble column assembly, 1× Honed marble surface disc with pre-fitted brass collar, 1× Stainless alignment rod, 4× Self-adhesive high-density felt protection pads, 1× Certificate of authenticity & provenance record.',
      assembly_guide: 'Single-point alignment: Thread the central stabilization rod hand-tight into base plate. Position surface disc over alignment collar and rotate 90° to engage internal brass lock. No wrenches or external tools required (approx. 4 minutes setup).',
      care_maintenance: 'Clean exclusively with a soft, lint-free microfiber cloth moistened with warm demineralized water. Avoid acidic cleaning agents, vinegars, or abrasive pads. Re-seal marble surface once annually with neutral microcrystalline paste wax.',
      shipping_and_returns: 'Dispatched in double-wall reinforced wooden crate with molded closed-cell foam inserts. Standard tracked courier transit across US, UK, and EU (4–7 business days). 30-day curatorial return window in original packaging.'
    }
  }
};
product1.selected_or_first_available_variant = product1.variants[0];

const product2 = {
  id: 2,
  title: 'Atelier Sculpted Plaster Amphora',
  type: 'Decorative Objects',
  vendor: 'Maison Aurelle Atelier',
  description: '<p>Hand-sculpted mineral plaster vessel with chalk-matte finish and subtle tactile veining. Handcrafted by atelier artisans.</p>',
  url: '/products/atelier-sculpted-plaster-amphora',
  price: 6800,
  compare_at_price: null,
  available: true,
  has_only_default_variant: true,
  featured_media: {
    src: '/assets/preview/sculpted-plaster-amphora.jpg',
    alt: 'Atelier Sculpted Plaster Amphora'
  },
  media: [{
    src: '/assets/preview/sculpted-plaster-amphora.jpg',
    alt: 'Atelier Sculpted Plaster Amphora'
  }],
  variants: [
    {
      id: 201,
      title: 'Default Title',
      price: 6800,
      sku: 'DEC-410-PL',
      available: true
    }
  ],
  metafields: {
    custom: {
      curatorial_label: 'Atelier Release',
      configuration_note: 'Single Plaster Vessel — 22cm Ø × 38cm H',
      dimensions_profile: 'Diameter: 22 cm (8.7 in) • Height: 38 cm (15 in) • Net Weight: 3.2 kg (7.0 lbs)',
      materials_construction: 'Hand-sculpted white gypsum plaster with mineral composite core.',
      care_maintenance: 'Dust gently with dry brush. Keep away from direct water exposure.',
      shipping_and_returns: 'Ships within 48h in custom shock-absorbing foam box.'
    }
  }
};
product2.selected_or_first_available_variant = product2.variants[0];

const product3 = {
  id: 3,
  title: 'Versailles Classic Panel Moulding Pack (4 pcs)',
  type: 'Architectural Details',
  vendor: 'Maison Aurelle Atelier',
  description: '<p>Architectural polyurethane moulding panels with authentic French Rococo profiles. Lightweight, moisture resistant, and pre-primed for immediate painting.</p>',
  url: '/products/versailles-classic-panel-moulding-pack',
  price: 8400,
  compare_at_price: null,
  available: true,
  has_only_default_variant: true,
  featured_media: {
    src: '/assets/preview/wall-moulding-kit.jpg',
    alt: 'Versailles Classic Panel Moulding Pack'
  },
  media: [{
    src: '/assets/preview/wall-moulding-kit.jpg',
    alt: 'Versailles Classic Panel Moulding Pack'
  }],
  variants: [
    {
      id: 301,
      title: 'Default Title',
      price: 8400,
      sku: 'ARC-102-PK4',
      available: true
    }
  ],
  metafields: {
    custom: {
      curatorial_label: 'Architectural Edition',
      configuration_note: 'Carton of 4 Paneling Units — 240cm L each',
      dimensions_profile: 'Piece Length: 240 cm (94.5 in) • Width: 8.5 cm (3.3 in) • Projection: 2.2 cm (0.86 in) • 4 pcs per pack.',
      moulding_piece_length: '240 cm / 94.5 in',
      moulding_width: '8.5 cm / 3.3 in',
      moulding_depth_projection: '2.2 cm / 0.86 in',
      moulding_pieces_per_pack: 4,
      moulding_coverage: '9.6 linear meters / pack',
      materials_construction: 'High-density extruded architectural polyurethane with factory applied matte primer.',
      care_maintenance: 'Wipe clean with damp cloth. Can be painted with standard latex or oil-based interior wall paint.',
      shipping_and_returns: 'Ships in heavy-duty protective cardboard tubes.'
    }
  }
};
product3.selected_or_first_available_variant = product3.variants[0];

const product4 = {
  id: 4,
  title: 'Faubourg Cast Bronze Dish & Pedestal',
  type: 'Decorative Objects',
  vendor: 'Maison Aurelle Atelier',
  description: '<p>Solid cast bronze shallow accent dish on raised geometric plinth. Hand-patinated warm bronze finish with subtle golden undertones.</p>',
  url: '/products/faubourg-cast-bronze-dish-pedestal',
  price: 9500,
  compare_at_price: null,
  available: true,
  has_only_default_variant: true,
  featured_media: {
    src: '/assets/preview/sculpted-plaster-amphora.jpg',
    alt: 'Faubourg Cast Bronze Dish & Pedestal'
  },
  media: [{
    src: '/assets/preview/sculpted-plaster-amphora.jpg',
    alt: 'Faubourg Cast Bronze Dish & Pedestal'
  }],
  variants: [
    {
      id: 401,
      title: 'Default Title',
      price: 9500,
      sku: 'DEC-505-BZ',
      available: true
    }
  ],
  metafields: {
    custom: {
      curatorial_label: 'Limited Foundry Cast',
      configuration_note: 'Bronze Accent Dish — 28cm Ø × 12cm H',
      dimensions_profile: 'Diameter: 28 cm (11 in) • Height: 12 cm (4.7 in) • Net Weight: 4.8 kg (10.6 lbs)',
      materials_construction: 'Lost-wax cast bronze with hand-applied French patina.',
      care_maintenance: 'Clean with dry microfiber cloth. Do not apply harsh chemical abrasives.',
      shipping_and_returns: 'Ships in bespoke linen presentation box with padded protection.'
    }
  }
};
product4.selected_or_first_available_variant = product4.variants[0];

// Set companion pairings for Product 1
product1.metafields.custom.complementary_products = {
  value: [product2, product3]
};

const allProducts = [product1, product2, product3, product4];

const collections = {
  '': {
    id: 1,
    title: 'Maison Aurelle Selection',
    description: 'Four essential editions presented without artificial rarity or inflated counts.',
    url: '/collections/all',
    products: allProducts
  },
  'all': {
    id: 1,
    title: 'Maison Aurelle Curation',
    description: 'The complete catalogue of French modern classicism, architectural mouldings, and sculpted decorative accents.',
    url: '/collections/all',
    products: allProducts
  },
  'side-and-accent-tables': {
    id: 2,
    title: 'Side & Accent Tables',
    description: 'Round fluted marble & brass pedestal accents designed for intimate salon seating.',
    url: '/collections/side-and-accent-tables',
    products: [product1]
  },
  'decorative-objects': {
    id: 3,
    title: 'Decorative Objects',
    description: 'Hand-sculpted vessels, cast bronze accents, and minimal stoneware forms.',
    url: '/collections/decorative-objects',
    products: [product2, product4]
  },
  'architectural-details': {
    id: 4,
    title: 'Architectural Details',
    description: 'Lightweight French Rococo and classic boiserie wall mouldings.',
    url: '/collections/architectural-details',
    products: [product3]
  }
};

const baseContext = {
  shop: {
    name: 'Maison Aurelle',
    customer_accounts_enabled: false,
    policies: [
      { title: 'Privacy Policy', url: '#' },
      { title: 'Terms of Service', url: '#' },
      { title: 'Provenance Authentication', url: '#' }
    ]
  },
  settings: {
    logo: logoUrl,
    logo_width: 180,
    favicon: '/assets/favicon.ico'
  },
  request: {
    locale: { iso_code: 'en' }
  },
  routes: {
    root_url: '/',
    all_products_collection_url: '/collections/all',
    collections_url: '/collections',
    cart_url: '/cart',
    search_url: '/search',
    account_url: '/account'
  },
  cart: {
    item_count: 0,
    items: [],
    total_price: 0
  },
  linklists: {
    'main-menu': {
      links: [
        { title: 'Shop', url: '/collections/all', current: false },
        { title: 'Tables', url: '/collections/side-and-accent-tables', current: false },
        { title: 'Decor', url: '/collections/decorative-objects', current: false },
        { title: 'Architectural Details', url: '/collections/architectural-details', current: false }
      ]
    },
    '': {
      links: []
    }
  },
  collections,
  products: {
    'aurelle-fluted-marble-pedestal-table': product1,
    'atelier-sculpted-plaster-amphora': product2,
    'versailles-classic-panel-moulding-pack': product3,
    'faubourg-cast-bronze-dish-pedestal': product4
  },
  defaultProduct: product1,
  defaultCollection: collections['all']
};

module.exports = {
  baseContext,
  product1,
  product2,
  product3,
  product4,
  allProducts,
  collections
};
