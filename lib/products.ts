export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  subcategory: string;
  brand: string;
  featured?: boolean;
  weeklySpecial?: boolean;
  specifications?: {
    [key: string]: string;
  };
}

export const categories = [
  {
    name: "Closeout Deals",
    subcategories: [],
  },
  {
    name: "Prudent Way",
    subcategories: [],
  },
  {
    name: "Adapter",
    subcategories: [
      "AC/DC Universal Power Adapter",
      "USB/HDMI/VGA Adapters",
      "Switching Power Supply",
    ],
  },
  {
    name: "Cable",
    subcategories: [
      "Cat 5",
      "Cat 6",
      "DVI",
      "Floppy",
      "Firewire",
      "HDMI",
      "IDE",
      "KVM",
      "Parallel",
      "Power",
      "SATA",
      "SCSI",
      "Serial",
      "USB",
      "VGA",
    ],
  },
  {
    name: "Case/Accessory",
    subcategories: ["Case", "Case Accessory", "Rackmount"],
  },
  {
    name: "Controller Card",
    subcategories: [
      "Firewire",
      "IDE",
      "Parallel",
      "SATA",
      "SCSI",
      "Serial",
      "USB",
    ],
  },
  {
    name: "Cooling",
    subcategories: ["Case Fan", "CPU Cooler", "Thermal Compound"],
  },
  {
    name: "CPU",
    subcategories: ["AMD", "Intel"],
  },
  {
    name: "Enclosure",
    subcategories: ['2.5"', '3.5"', '5.25"', "Multi-Bay"],
  },
  {
    name: "Express Card/PCMCIA",
    subcategories: [],
  },
  {
    name: "Flash Product",
    subcategories: ["CF Card", "Memory Stick", "SD Card", "USB Flash Drive"],
  },
  {
    name: "Hard Drive",
    subcategories: ['2.5" HDD', '3.5" HDD', "SSD", "M.2 SSD"],
  },
  {
    name: "Input Device",
    subcategories: ["Keyboard", "Mouse", "Combo", "Touchpad"],
  },
  {
    name: "LED Monitor",
    subcategories: ['19"', '20"', '21"', '22"', '23"', '24"', '27"', '32"'],
  },
  {
    name: "Memory",
    subcategories: ["DDR3", "DDR4", "DDR5", "Laptop Memory"],
  },
  {
    name: "Motherboard",
    subcategories: ["AMD", "Intel"],
  },
  {
    name: "Multimedia",
    subcategories: ["Speakers", "Webcam", "Headset"],
  },
  {
    name: "Networking",
    subcategories: ["Router", "Switch", "Wireless Adapter", "Network Card"],
  },
  {
    name: "Notebooks",
    subcategories: ["Brand New", "Refurbished"],
  },
  {
    name: "Notebook Accessories",
    subcategories: ["AC Adapter", "Battery", "Docking Station", "Laptop Bag"],
  },
  {
    name: "Optical Drive",
    subcategories: ["DVD-ROM", "DVD-RW", "Blu-ray"],
  },
  {
    name: "Portable Power",
    subcategories: ["2400 mAH", "5000 mAH", "10000 mAH"],
  },
  {
    name: "Power Supply",
    subcategories: ["ATX", "SFX", "Modular", "Non-Modular"],
  },
  {
    name: "Printer",
    subcategories: ["Inkjet", "Laser"],
  },
  {
    name: "Software",
    subcategories: [
      "Operating System",
      "Office Suite",
      "Antivirus",
      "Utilities",
    ],
  },
  {
    name: "Sound Card",
    subcategories: ["Internal", "External"],
  },
  {
    name: "System Bundle",
    subcategories: ["Case+Power"],
  },
  {
    name: "Tablet",
    subcategories: ['7"', "Tablet PC"],
  },
  {
    name: "USB Device",
    subcategories: ["USB Hub", "USB Adapter", "USB Card Reader"],
  },
  {
    name: "VGA",
    subcategories: ["NVIDIA", "AMD"],
  },
];

export const brands = [
  "amd",
  "asus",
  "dlink",
  "intel",
  "kingston",
  "lg",
  "linksys",
  "liteon",
  "logitech",
  "microsoft",
  "msi",
  "nec",
  "prudentway",
  "samsung",
  "seagate",
  "sony",
  "syba",
  "tplink",
  "wd",
  "wt",
];

// Sample products
export const products: Product[] = [
  {
    id: "1",
    sku: "PWI-U3-SATA",
    name: "USB 3.0 to SATA Adapter",
    description: "High-speed USB 3.0 to SATA adapter for external hard drives",
    price: 13.99,
    image: "/usb-sata-adapter.jpg",
    category: "Adapter",
    subcategory: "USB/HDMI/VGA Adapters",
    brand: "Prudent Way",
    featured: true,
    specifications: {
      Interface: "USB 3.0",
      "Connector Type": "SATA",
      Speed: "Up to 5 Gbps",
      Color: "Black",
      Warranty: "1 Year",
    },
  },
  {
    id: "2",
    sku: "PWI-DP-VGA",
    name: "DisplayPort to VGA Adapter",
    description: "DisplayPort Male to VGA Female Active Adapter",
    price: 12.99,
    image: "/displayport-vga-adapter.jpg",
    category: "Adapter",
    subcategory: "USB/HDMI/VGA Adapters",
    brand: "Prudent Way",
    featured: true,
    specifications: {
      Input: "DisplayPort",
      Output: "VGA",
      "Max Resolution": "1920x1200",
      Color: "Black",
      Warranty: "1 Year",
    },
  },
  {
    id: "3",
    sku: "PWI-AC90SE",
    name: "90W Universal Power Adapter",
    description:
      "90W Universal AC Power Adapter with 15 Tips (Include new HP/Dell/Lenovo USB)",
    price: 23.99,
    image: "/power-adapter-90w.jpg",
    category: "Adapter",
    subcategory: "AC/DC Universal Power Adapter",
    brand: "Prudent Way",
    featured: true,
    specifications: {
      Wattage: "90W",
      "Number of Tips": "15",
      Input: "100-240V AC",
      Output: "15V-20V DC",
      Warranty: "2 Years",
    },
  },
  {
    id: "4",
    sku: "ESE-SSP-1U-1",
    name: "Enterprise SSD 1TB",
    description: "Fast SMART SECURITY PREMIUM 1TB SSD with 10 NEW RETAIL BOX",
    price: 22.99,
    image: "/enterprise-ssd.jpg",
    category: "Hard Drive",
    subcategory: "SSD",
    brand: "Samsung",
    weeklySpecial: true,
    specifications: {
      Capacity: "1TB",
      "Form Factor": '2.5"',
      Interface: "SATA III",
      Speed: "Up to 550MB/s",
      Cache: "64MB",
      Warranty: "5 Years",
    },
  },
  {
    id: "5",
    sku: "WES-WD10EZEX",
    name: "WD 1TB Blue Hard Drive",
    description: 'WD 1TB Blue SATA 6.0Gb/s 3.5" Internal Hard Drive',
    price: 39.99,
    image: "/western-digital-hard-drive.jpg",
    category: "Hard Drive",
    subcategory: '3.5" HDD',
    brand: "Western Digital",
    weeklySpecial: true,
    specifications: {
      Capacity: "1TB",
      "Form Factor": '3.5"',
      Interface: "SATA 6.0Gb/s",
      RPM: "7200",
      Cache: "64MB",
      Warranty: "2 Years",
    },
  },
  {
    id: "6",
    sku: "WT-USB-EX144",
    name: "USB 3.0 External Enclosure",
    description:
      "WT USA External 1.44 Floppy Drive USB Interface, Made in China",
    price: 9.99,
    image: "/usb-external-enclosure.jpg",
    category: "Enclosure",
    subcategory: '2.5"',
    brand: "Western Digital",
    weeklySpecial: true,
    specifications: {
      Type: "External Enclosure",
      "Compatible Size": '2.5"',
      Interface: "USB 3.0",
      Material: "Aluminum",
      Warranty: "1 Year",
    },
  },
  {
    id: "7",
    sku: "MTC-KW9-00475",
    name: "Windows 10 Home Full Version",
    description:
      "Windows 10 Home- Full Version 32 & 64-bit (USB Flash Drive) KW9-00475",
    price: 123.99,
    image: "/windows-10-usb.jpg",
    category: "Software",
    subcategory: "Operating System",
    brand: "Microsoft",
    weeklySpecial: true,
    specifications: {
      Product: "Windows 10 Home",
      Versions: "32-bit & 64-bit",
      Media: "USB Flash Drive",
      "License Type": "Full Version",
      SKU: "KW9-00475",
    },
  },
  {
    id: "8",
    sku: "ACE-XN242HYL",
    name: 'Acer 24" Full HD Monitor',
    description:
      'Acer XN242HYL 24" Full HD IPS LCD/LED 1920x1080, 4ms (GTG) Refresh Rate, 16:9 Aspect Ratio, 250 cd/m2, Built-in Speakers, Wall Mountable',
    price: 119.99,
    image: "/acer-monitor-24-inch.jpg",
    category: "LED Monitor",
    subcategory: '24"',
    brand: "Acer",
    weeklySpecial: true,
    specifications: {
      "Screen Size": "24 inches",
      Resolution: "1920x1080 (Full HD)",
      "Panel Type": "IPS",
      "Response Time": "4ms GTG",
      "Refresh Rate": "60Hz",
      "Built-in Speakers": "Yes",
      "VESA Mount": "Yes",
    },
  },
  {
    id: "9",
    sku: "MIC-TSD-02776",
    name: "Microsoft Office Home and Business 2016",
    description:
      "Microsoft Office Home and Business 2016 32/64 English NA/PR Only Medialess",
    price: 199.99,
    image: "/microsoft-office-box.jpg",
    category: "Software",
    subcategory: "Office Suite",
    brand: "Microsoft",
    weeklySpecial: true,
    specifications: {
      Suite: "Home and Business",
      Version: "2016",
      Platforms: "32-bit & 64-bit",
      Language: "English",
      "Included Apps": "Word, Excel, PowerPoint, Outlook, OneNote",
    },
  },
  {
    id: "10",
    sku: "INTEL-I9-13900K",
    name: "Intel Core i9-13900K",
    description:
      "Intel Core i9-13900K Desktop Processor 24 cores (8 P-cores + 16 E-cores)",
    price: 589.99,
    image: "/intel-core-i9.png",
    category: "CPU",
    subcategory: "Intel",
    brand: "Intel",
    specifications: {
      Cores: "24 (8 P-cores + 16 E-cores)",
      Threads: "32",
      "Base Clock": "3.0 GHz",
      "Boost Clock": "5.8 GHz",
      Cache: "36MB",
      TDP: "253W",
      Socket: "LGA 1700",
    },
  },
  {
    id: "11",
    sku: "AMD-RYZEN-7950X",
    name: "AMD Ryzen 9 7950X",
    description:
      "AMD Ryzen 9 7950X 16-Core, 32-Thread Unlocked Desktop Processor",
    price: 549.99,
    image: "/amd-ryzen-9-processor.jpg",
    category: "CPU",
    subcategory: "AMD",
    brand: "AMD",
    specifications: {
      Cores: "16",
      Threads: "32",
      "Base Clock": "4.5 GHz",
      "Boost Clock": "5.7 GHz",
      Cache: "128MB",
      TDP: "105W",
      Socket: "AM5",
    },
  },
  {
    id: "12",
    sku: "CORS-VENG-32GB",
    name: "Corsair Vengeance 32GB DDR5",
    description: "Corsair Vengeance 32GB (2x16GB) DDR5 6000MHz C36 Memory",
    price: 129.99,
    image: "/corsair-vengeance-ram.jpg",
    category: "Memory",
    subcategory: "DDR5",
    brand: "Corsair",
    specifications: {
      Capacity: "32GB (2x16GB)",
      Type: "DDR5",
      Speed: "6000MHz",
      "CAS Latency": "C36",
      "Form Factor": "DIMM",
      Warranty: "Lifetime",
    },
  },
  {
    id: "13",
    sku: "ASUS-ROG-Z790",
    name: "ASUS ROG Maximus Z790 Hero",
    description: "ASUS ROG Maximus Z790 Hero ATX Gaming Motherboard",
    price: 629.99,
    image: "/asus-rog-motherboard.jpg",
    category: "Motherboard",
    subcategory: "Intel",
    brand: "ASUS",
    specifications: {
      Socket: "LGA 1700",
      "Form Factor": "ATX",
      Chipset: "Intel Z790",
      Memory: "DDR5",
      Lanes: "16x PCIe 5.0",
      "Built-in Wifi": "WiFi 6E",
      Warranty: "3 Years",
    },
  },
  {
    id: "14",
    sku: "SAMSUNG-980PRO-2TB",
    name: "Samsung 980 PRO 2TB NVMe SSD",
    description: "Samsung 980 PRO 2TB PCIe 4.0 NVMe M.2 Internal SSD",
    price: 199.99,
    image: "/samsung-980-pro-ssd.jpg",
    category: "Hard Drive",
    subcategory: "M.2 SSD",
    brand: "Samsung",
    specifications: {
      Capacity: "2TB",
      "Form Factor": "M.2",
      Interface: "PCIe 4.0 NVMe",
      Speed: "Up to 7,100MB/s",
      Cache: "16GB",
      Warranty: "5 Years",
    },
  },
  {
    id: "15",
    sku: "CORSAIR-RM850X",
    name: "Corsair RM850x 850W Power Supply",
    description:
      "Corsair RM850x 850W 80 PLUS Gold Fully Modular ATX Power Supply",
    price: 134.99,
    image: "/corsair-power-supply.jpg",
    category: "Power Supply",
    subcategory: "Modular",
    brand: "Corsair",
    specifications: {
      Wattage: "850W",
      "Efficiency Rating": "80+ Gold",
      Type: "Fully Modular",
      "Form Factor": "ATX",
      Connections: "1x 20+4pin ATX, 5x PCIe 6+2pin",
      Warranty: "10 Years",
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
