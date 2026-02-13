export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image: string;
  category: string;
  subcategory: string;
  brand: string;
  listid?: number;
  featured?: boolean;
  weeklySpecial?: boolean;
  specifications?: {
    [key: string]: string;
  };
}

export const categories = [
  {
    name: 'Closeout Deals',
    subcategories: [
      { label: 'Hardware', value: 123 },
      { label: 'Software', value: 124 },
    ],
  },
  {
    name: 'Prudent Way',
    subcategories: [
      { label: 'AC/DC Universal Power Adapter', value: 151 },
      { label: 'USB/HDMI/VGA Adapters', value: 152 },
      { label: 'Switching Power Supply', value: 150 },
    ],
  },
  {
    name: 'Adapter',
    subcategories: [
      { label: 'IDE/SATA', value: 114 },
      { label: 'Power', value: 115 },
      { label: 'USB', value: 116 },
      { label: 'VGA/DVI/HDMI', value: 117 },
      { label: 'DisplayPort/Mini DisplayPort', value: 148 },
      { label: 'Others', value: 118 },
    ],
  },
  {
    name: 'Cable',
    subcategories: [
      { label: 'Cat 5', value: 1 },
      { label: 'Cat 6', value: 2 },
      { label: 'DVI', value: 3 },
      { label: 'Floppy', value: 4 },
      { label: 'Firewire', value: 5 },
      { label: 'HDMI', value: 6 },
      { label: 'IDE', value: 7 },
      { label: 'KVM', value: 8 },
      { label: 'Parallel Printer', value: 9 },
      { label: 'Power', value: 10 },
      { label: 'SATA', value: 11 },
      { label: 'USB', value: 12 },
      { label: 'VGA', value: 13 },
      { label: 'ESATA', value: 14 },
      { label: 'Others', value: 15 },
      { label: 'iPhone', value: 45 },
    ],
  },
  {
    name: 'Case/Accessory',
    subcategories: [
      { label: 'Full Tower', value: 16 },
      { label: 'Mid Tower', value: 17 },
      { label: 'Micro ATX', value: 18 },
      { label: 'Gaming', value: 19 },
      { label: 'Server Case', value: 20 },
      { label: 'Case Accessory', value: 21 },
    ],
  },
  {
    name: 'Controller Card',
    subcategories: [
      { label: 'Firewire/USB', value: 22 },
      { label: 'IDE', value: 23 },
      { label: 'Lower Profile', value: 24 },
      { label: 'Parallel/Serial', value: 25 },
      { label: 'SATA', value: 26 },
    ],
  },
  {
    name: 'Cooling',
    subcategories: [
      { label: 'Case', value: 27 },
      { label: 'CPU', value: 28 },
      { label: 'Notebook', value: 29 },
      { label: 'Accessory', value: 30 },
    ],
  },
  {
    name: 'CPU',
    subcategories: [
      { label: 'AMD AM4', value: 55 },
      { label: 'AMD FM2/FM2+', value: 32 },
      { label: 'Intel 1150', value: 131 },
      { label: 'Intel 1151', value: 132 },
    ],
  },
  {
    name: 'Enclosure',
    subcategories: [
      { label: '2.5"', value: 33 },
      { label: '3.5"', value: 34 },
    ],
  },
  {
    name: 'Express Card/PCMCIA',
    subcategories: [
      { label: 'Express Card', value: 37 },
      { label: 'PCMCIA"', value: 38 },
    ],
  },
  {
    name: 'Flash Product',
    subcategories: [
      { label: 'Card Reader', value: 39 },
      { label: 'USB Flash Drive', value: 40 },
      { label: 'Memory Card', value: 143 },
      { label: 'Micro SD', value: 35 },
    ],
  },
  {
    name: 'Hard Drive',
    subcategories: [
      { label: '3.5" IDE HDD', value: 41 },
      { label: '3.5" SATA HDD', value: 42 },
      { label: '2.5" IDE HDD', value: 43 },
      { label: '2.5" SATA HDD', value: 44 },
      { label: 'SSD', value: 130 },
      { label: 'External HDD', value: 46 },
    ],
  },
  {
    name: 'Input Device',
    subcategories: [
      { label: 'Keyboard', value: 47 },
      { label: 'Optical Mouse', value: 48 },
      { label: 'Keyboard/Mouse Combo', value: 49 },
      { label: 'Wireless Mouse', value: 50 },
      { label: 'Wireless Combo', value: 51 },
    ],
  },
  {
    name: 'LED Monitor',
    subcategories: [
      { label: '18.5"', value: 135 },
      { label: '19"-22"', value: 136 },
      { label: 'Over 23"', value: 137 },
    ],
  },
  {
    name: 'Memory',
    subcategories: [
      { label: 'DDR4', value: 65 },
      { label: 'DDR3', value: 56 },
      { label: 'DDR3 sodimm', value: 57 },
      { label: 'DDR2 Non NCC', value: 58 },
      { label: 'DDR2 Full Buffer', value: 59 },
      { label: 'DDR2 sodimm', value: 60 },
      { label: 'DDR1', value: 61 },
      { label: 'DDR1 sodimm', value: 62 },
      { label: 'SD RAM', value: 63 },
      { label: 'SD RAM sodimm', value: 64 },
    ],
  },
  {
    name: 'Motherboard',
    subcategories: [
      { label: 'Socket 1150', value: 142 },
      { label: 'Socket 1151', value: 153 },
      { label: 'AMD AM4', value: 145 },
      { label: 'Socket FM2/FM2+', value: 144 },
      { label: 'Socket FM1', value: 139 },
      { label: 'Accessory', value: 71 },
    ],
  },
  {
    name: 'Multimedia',
    subcategories: [
      { label: 'Headsets', value: 72 },
      { label: 'Speakers', value: 73 },
      { label: 'Recordable Media', value: 74 },
      { label: 'Webcam', value: 75 },
    ],
  },
  {
    name: 'Networking',
    subcategories: [
      { label: 'Antennas', value: 76 },
      { label: 'Bluetooth', value: 77 },
      { label: 'Cable Router', value: 84 },
      { label: 'KVM', value: 79 },
      { label: 'Modem', value: 80 },
      { label: 'Network Adapter', value: 81 },
      { label: 'PCMCIA', value: 82 },
      { label: 'Printer Server', value: 89 },
      { label: 'Switch', value: 83 },
      { label: 'Wireless G Adapter', value: 85 },
      { label: 'Wireless N Adapter', value: 86 },
      { label: 'Wireless G Router', value: 87 },
      { label: 'Wireless N Router', value: 88 },
      { label: 'Recertified', value: 90 },
    ],
  },
  {
    name: 'Notebooks',
    subcategories: [
      { label: 'Brand New', value: 119 },
      { label: 'Refurbished', value: 126 },
    ],
  },
  {
    name: 'Notebook Accessories',
    subcategories: [
      { label: 'Adapter', value: 91 },
      { label: 'Docking Station', value: 92 },
      { label: 'Fan', value: 93 },
      { label: 'Others', value: 125 },
    ],
  },
  {
    name: 'Optical Drive',
    subcategories: [
      { label: 'Blue Ray R/RW', value: 94 },
      { label: 'DVD R/RW', value: 95 },
      { label: 'Internal Slim Notebook', value: 96 },
      { label: 'External Slim', value: 97 },
      { label: 'Floppy', value: 98 },
    ],
  },
  {
    name: 'Portable Power',
    subcategories: [
      { label: '2400 mAH', value: 53 },
      { label: '5000 mAH', value: 52 },
      { label: '10000 mAH', value: 54 },
    ],
  },
  {
    name: 'Power Supply',
    subcategories: [
      { label: 'ATX', value: 99 },
      { label: 'Special (HP/Gateway/Dell)', value: 100 },
      { label: 'Micro ATX', value: 101 },
      { label: 'Server Ready', value: 102 },
    ],
  },
  {
    name: 'Printer',
    subcategories: [
      { label: 'Inkjet', value: 127 },
      { label: 'Laser', value: 129 },
    ],
  },
  {
    name: 'Software',
    subcategories: [
      { label: 'Antivirus', value: 103 },
      { label: 'Internet Security', value: 104 },
      { label: 'Microsoft OS', value: 105 },
      { label: 'Microsoft Office', value: 106 },
      { label: 'Others', value: 107 },
    ],
  },
  {
    name: 'Sound Card',
    subcategories: [
      { label: 'PCI Sound Card', value: 108 },
      { label: 'USB Sound', value: 109 },
    ],
  },
  {
    name: 'System Bundle',
    subcategories: [
      { label: 'AMD', value: 120 },
      { label: 'Intel', value: 121 },
      { label: 'Case+Power', value: 122 },
    ],
  },
  {
    name: 'Tablet',
    subcategories: [
      { label: '7"', value: 160 },
      { label: 'Tablet PC', value: 161 },
    ],
  },
  {
    name: 'USB Device',
    subcategories: [
      { label: 'Hub', value: 78 },
      { label: 'HDD Docking Station', value: 36 },
    ],
  },
  {
    name: 'VGA',
    subcategories: [
      { label: 'AGP', value: 110 },
      { label: 'PCI', value: 111 },
      { label: 'PCIE', value: 112 },
      { label: 'TV Tuner', value: 113 },
    ],
  },
];

export const brands = [
  'amd',
  'asus',
  'dlink',
  'intel',
  'kingston',
  'lg',
  'linksys',
  'liteon',
  'logitech',
  'microsoft',
  'msi',
  'nec',
  'prudentway',
  'samsung',
  'seagate',
  'sony',
  'syba',
  'tplink',
  'wd',
  'wt',
];

// Sample products
export const products: Product[] = [
  {
    id: '1',
    sku: 'PWI-U3-SATA',
    name: 'USB 3.0 to SATA Adapter',
    description: 'High-speed USB 3.0 to SATA adapter for external hard drives',
    price: 13.99,
    discount: 10.99,
    image: '/usb-sata-adapter.jpg',
    category: 'Adapter',
    subcategory: 'USB/HDMI/VGA Adapters',
    brand: 'Prudent Way',
    featured: true,
    specifications: {
      Interface: 'USB 3.0',
      'Connector Type': 'SATA',
      Speed: 'Up to 5 Gbps',
      Color: 'Black',
      Warranty: '1 Year',
    },
  },
  {
    id: '2',
    sku: 'PWI-DP-VGA',
    name: 'DisplayPort to VGA Adapter',
    description: 'DisplayPort Male to VGA Female Active Adapter',
    price: 12.99,
    image: '/displayport-vga-adapter.jpg',
    category: 'Adapter',
    subcategory: 'USB/HDMI/VGA Adapters',
    brand: 'Prudent Way',
    featured: true,
    specifications: {
      Input: 'DisplayPort',
      Output: 'VGA',
      'Max Resolution': '1920x1200',
      Color: 'Black',
      Warranty: '1 Year',
    },
  },
  {
    id: '3',
    sku: 'PWI-AC90SE',
    name: '90W Universal Power Adapter',
    description:
      '90W Universal AC Power Adapter with 15 Tips (Include new HP/Dell/Lenovo USB)',
    price: 23.99,
    image: '/power-adapter-90w.jpg',
    category: 'Adapter',
    subcategory: 'AC/DC Universal Power Adapter',
    brand: 'Prudent Way',
    featured: true,
    specifications: {
      Wattage: '90W',
      'Number of Tips': '15',
      Input: '100-240V AC',
      Output: '15V-20V DC',
      Warranty: '2 Years',
    },
  },
  {
    id: '4',
    sku: 'ESE-SSP-1U-1',
    name: 'Enterprise SSD 1TB',
    description: 'Fast SMART SECURITY PREMIUM 1TB SSD with 10 NEW RETAIL BOX',
    price: 22.99,
    image: '/enterprise-ssd.jpg',
    category: 'Hard Drive',
    subcategory: 'SSD',
    brand: 'Samsung',
    weeklySpecial: true,
    specifications: {
      Capacity: '1TB',
      'Form Factor': '2.5"',
      Interface: 'SATA III',
      Speed: 'Up to 550MB/s',
      Cache: '64MB',
      Warranty: '5 Years',
    },
  },
  {
    id: '5',
    sku: 'WES-WD10EZEX',
    name: 'WD 1TB Blue Hard Drive',
    description: 'WD 1TB Blue SATA 6.0Gb/s 3.5" Internal Hard Drive',
    price: 39.99,
    image: '/western-digital-hard-drive.jpg',
    category: 'Hard Drive',
    subcategory: '3.5" HDD',
    brand: 'Western Digital',
    weeklySpecial: true,
    specifications: {
      Capacity: '1TB',
      'Form Factor': '3.5"',
      Interface: 'SATA 6.0Gb/s',
      RPM: '7200',
      Cache: '64MB',
      Warranty: '2 Years',
    },
  },
  {
    id: '6',
    sku: 'WT-USB-EX144',
    name: 'USB 3.0 External Enclosure',
    description:
      'WT USA External 1.44 Floppy Drive USB Interface, Made in China',
    price: 9.99,
    image: '/usb-external-enclosure.jpg',
    category: 'Enclosure',
    subcategory: '2.5"',
    brand: 'Western Digital',
    weeklySpecial: true,
    specifications: {
      Type: 'External Enclosure',
      'Compatible Size': '2.5"',
      Interface: 'USB 3.0',
      Material: 'Aluminum',
      Warranty: '1 Year',
    },
  },
  {
    id: '7',
    sku: 'MTC-KW9-00475',
    name: 'Windows 10 Home Full Version',
    description:
      'Windows 10 Home- Full Version 32 & 64-bit (USB Flash Drive) KW9-00475',
    price: 123.99,
    image: '/windows-10-usb.jpg',
    category: 'Software',
    subcategory: 'Operating System',
    brand: 'Microsoft',
    weeklySpecial: true,
    specifications: {
      Product: 'Windows 10 Home',
      Versions: '32-bit & 64-bit',
      Media: 'USB Flash Drive',
      'License Type': 'Full Version',
      SKU: 'KW9-00475',
    },
  },
  {
    id: '8',
    sku: 'ACE-XN242HYL',
    name: 'Acer 24" Full HD Monitor',
    description:
      'Acer XN242HYL 24" Full HD IPS LCD/LED 1920x1080, 4ms (GTG) Refresh Rate, 16:9 Aspect Ratio, 250 cd/m2, Built-in Speakers, Wall Mountable',
    price: 119.99,
    image: '/acer-monitor-24-inch.jpg',
    category: 'LED Monitor',
    subcategory: '24"',
    brand: 'Acer',
    weeklySpecial: true,
    specifications: {
      'Screen Size': '24 inches',
      Resolution: '1920x1080 (Full HD)',
      'Panel Type': 'IPS',
      'Response Time': '4ms GTG',
      'Refresh Rate': '60Hz',
      'Built-in Speakers': 'Yes',
      'VESA Mount': 'Yes',
    },
  },
  {
    id: '9',
    sku: 'MIC-TSD-02776',
    name: 'Microsoft Office Home and Business 2016',
    description:
      'Microsoft Office Home and Business 2016 32/64 English NA/PR Only Medialess',
    price: 199.99,
    image: '/microsoft-office-box.jpg',
    category: 'Software',
    subcategory: 'Office Suite',
    brand: 'Microsoft',
    weeklySpecial: true,
    specifications: {
      Suite: 'Home and Business',
      Version: '2016',
      Platforms: '32-bit & 64-bit',
      Language: 'English',
      'Included Apps': 'Word, Excel, PowerPoint, Outlook, OneNote',
    },
  },
  {
    id: '10',
    sku: 'INTEL-I9-13900K',
    name: 'Intel Core i9-13900K',
    description:
      'Intel Core i9-13900K Desktop Processor 24 cores (8 P-cores + 16 E-cores)',
    price: 589.99,
    image: '/intel-core-i9.png',
    category: 'CPU',
    subcategory: 'Intel',
    brand: 'Intel',
    specifications: {
      Cores: '24 (8 P-cores + 16 E-cores)',
      Threads: '32',
      'Base Clock': '3.0 GHz',
      'Boost Clock': '5.8 GHz',
      Cache: '36MB',
      TDP: '253W',
      Socket: 'LGA 1700',
    },
  },
  {
    id: '11',
    sku: 'AMD-RYZEN-7950X',
    name: 'AMD Ryzen 9 7950X',
    description:
      'AMD Ryzen 9 7950X 16-Core, 32-Thread Unlocked Desktop Processor',
    price: 549.99,
    image: '/amd-ryzen-9-processor.jpg',
    category: 'CPU',
    subcategory: 'AMD',
    brand: 'AMD',
    specifications: {
      Cores: '16',
      Threads: '32',
      'Base Clock': '4.5 GHz',
      'Boost Clock': '5.7 GHz',
      Cache: '128MB',
      TDP: '105W',
      Socket: 'AM5',
    },
  },
  {
    id: '12',
    sku: 'CORS-VENG-32GB',
    name: 'Corsair Vengeance 32GB DDR5',
    description: 'Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz C36 Memory',
    price: 129.99,
    image: '/corsair-vengeance-ram.jpg',
    category: 'Memory',
    subcategory: 'DDR5',
    brand: 'Corsair',
    specifications: {
      Capacity: '32GB (2x16GB)',
      Type: 'DDR5',
      Speed: '6000MHz',
      'CAS Latency': 'C36',
      'Form Factor': 'DIMM',
      Warranty: 'Lifetime',
    },
  },
  {
    id: '13',
    sku: 'ASUS-ROG-Z790',
    name: 'ASUS ROG Maximus Z790 Hero',
    description: 'ASUS ROG Maximus Z790 Hero ATX Gaming Motherboard',
    price: 629.99,
    image: '/asus-rog-motherboard.jpg',
    category: 'Motherboard',
    subcategory: 'Intel',
    brand: 'ASUS',
    specifications: {
      Socket: 'LGA 1700',
      'Form Factor': 'ATX',
      Chipset: 'Intel Z790',
      Memory: 'DDR5',
      Lanes: '16x PCIe 5.0',
      'Built-in Wifi': 'WiFi 6E',
      Warranty: '3 Years',
    },
  },
  {
    id: '14',
    sku: 'SAMSUNG-980PRO-2TB',
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    description: 'Samsung 980 PRO 2TB PCIe 4.0 NVMe M.2 Internal SSD',
    price: 199.99,
    image: '/samsung-980-pro-ssd.jpg',
    category: 'Hard Drive',
    subcategory: 'M.2 SSD',
    brand: 'Samsung',
    specifications: {
      Capacity: '2TB',
      'Form Factor': 'M.2',
      Interface: 'PCIe 4.0 NVMe',
      Speed: 'Up to 7,100MB/s',
      Cache: '16GB',
      Warranty: '5 Years',
    },
  },
  {
    id: '15',
    sku: 'CORSAIR-RM850X',
    name: 'Corsair RM850x 850W Power Supply',
    description:
      'Corsair RM850x 850W 80 PLUS Gold Fully Modular ATX Power Supply',
    price: 134.99,
    image: '/corsair-power-supply.jpg',
    category: 'Power Supply',
    subcategory: 'Modular',
    brand: 'Corsair',
    specifications: {
      Wattage: '850W',
      'Efficiency Rating': '80+ Gold',
      Type: 'Fully Modular',
      'Form Factor': 'ATX',
      Connections: '1x 20+4pin ATX, 5x PCIe 6+2pin',
      Warranty: '10 Years',
    },
  },
];

export function searchProducts(query: string): Product[] {
  const lowercasedQuery = query.toLowerCase();
  return products.filter((product) => {
    const inName = product.name.toLowerCase().includes(lowercasedQuery);
    const inDescription = product.description
      .toLowerCase()
      .includes(lowercasedQuery);
    return inName || inDescription;
  });
}
