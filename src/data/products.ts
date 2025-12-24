export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    rating: number;
    reviews: number;
    description: string;
    image: string;
    colors?: string[];
    sizes?: string[];
    inStock: boolean;
    featured?: boolean;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 299.99,
        category: "Electronics",
        rating: 4.8,
        reviews: 1234,
        description: "Experience crystal-clear audio with active noise cancellation, 30-hour battery life, and premium comfort. Perfect for music lovers and professionals.",
        image: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        colors: ["Black", "Silver", "Rose Gold"],
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Ultra-Slim Laptop Pro",
        price: 1299.99,
        category: "Electronics",
        rating: 4.9,
        reviews: 856,
        description: "Powerful performance in a sleek design. 16GB RAM, 512GB SSD, stunning 4K display, and all-day battery life.",
        image: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        colors: ["Space Gray", "Silver"],
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "Smart Watch Elite",
        price: 399.99,
        category: "Electronics",
        rating: 4.7,
        reviews: 2341,
        description: "Track your fitness, monitor your health, and stay connected. Water-resistant with 7-day battery life.",
        image: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        colors: ["Black", "White", "Blue"],
        inStock: true,
        featured: false
    },
    {
        id: 4,
        name: "Designer Leather Backpack",
        price: 189.99,
        category: "Fashion",
        rating: 4.6,
        reviews: 543,
        description: "Premium leather construction with modern design. Multiple compartments for laptop, tablet, and daily essentials.",
        image: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        colors: ["Brown", "Black", "Tan"],
        inStock: true,
        featured: false
    },
    {
        id: 5,
        name: "Minimalist Desk Lamp",
        price: 79.99,
        category: "Home",
        rating: 4.5,
        reviews: 789,
        description: "Adjustable LED desk lamp with touch controls, multiple brightness levels, and USB charging port.",
        image: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
        inStock: true,
        featured: false
    },
    {
        id: 6,
        name: "Smartphone X Pro",
        price: 999.99,
        category: "Electronics",
        rating: 4.9,
        reviews: 3421,
        description: "Flagship smartphone with triple camera system, 5G connectivity, and stunning OLED display.",
        image: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        colors: ["Midnight Blue", "Silver", "Gold"],
        inStock: true,
        featured: true
    },
    {
        id: 7,
        name: "Wireless Charging Pad",
        price: 49.99,
        category: "Electronics",
        rating: 4.4,
        reviews: 1567,
        description: "Fast wireless charging for all Qi-enabled devices. Sleek design with LED indicator.",
        image: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        inStock: true,
        featured: false
    },
    {
        id: 8,
        name: "Premium Coffee Maker",
        price: 249.99,
        category: "Home",
        rating: 4.7,
        reviews: 892,
        description: "Programmable coffee maker with thermal carafe, brew strength control, and auto-shutoff.",
        image: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        inStock: true,
        featured: false
    },
    {
        id: 9,
        name: "Ergonomic Office Chair",
        price: 449.99,
        category: "Home",
        rating: 4.8,
        reviews: 1123,
        description: "Premium ergonomic chair with lumbar support, adjustable armrests, and breathable mesh back.",
        image: "linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)",
        colors: ["Black", "Gray"],
        inStock: true,
        featured: false
    },
    {
        id: 10,
        name: "Bluetooth Speaker Pro",
        price: 149.99,
        category: "Electronics",
        rating: 4.6,
        reviews: 2156,
        description: "Portable speaker with 360° sound, waterproof design, and 20-hour battery life.",
        image: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        colors: ["Black", "Blue", "Red"],
        inStock: true,
        featured: false
    },
    {
        id: 11,
        name: "Mechanical Keyboard RGB",
        price: 179.99,
        category: "Electronics",
        rating: 4.7,
        reviews: 1834,
        description: "Premium mechanical keyboard with customizable RGB lighting and tactile switches.",
        image: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
        inStock: true,
        featured: false
    },
    {
        id: 12,
        name: "Fitness Yoga Mat",
        price: 39.99,
        category: "Sports",
        rating: 4.5,
        reviews: 967,
        description: "Non-slip yoga mat with extra cushioning and carrying strap. Perfect for yoga and pilates.",
        image: "linear-gradient(135deg, #fdcbf1 0%, #e6dee9 100%)",
        colors: ["Purple", "Blue", "Pink"],
        inStock: true,
        featured: false
    }
];

export const categories = ["All", "Electronics", "Fashion", "Home", "Sports"];
