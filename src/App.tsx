import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Page,
  Masthead,
  MastheadMain,
  MastheadBrand,
  MastheadContent,
  PageSection,
  Title,
  Button,
  Badge,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
  SearchInput,
  Select,
  SelectOption,
  SelectList,
  MenuToggle,
  Grid,
  GridItem,
  Banner,
  Dropdown,
  DropdownList,
  DropdownItem,
  Avatar
} from '@patternfly/react-core';
import { ShoppingCartIcon, FilterIcon } from '@patternfly/react-icons';
import { products, categories, type Product } from './data/products';
import { ProductCard } from './components/ProductCard';
import { ShoppingCart, type CartItem } from './components/ShoppingCart';
import { ProductModal } from './components/ProductModal';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const handleViewDetails = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      product.description.toLowerCase().includes(searchValue.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProducts = products.filter(p => p.featured);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const HeaderComponent = () => {
    const navigate = useNavigate();
    const { user, logout, isAuthenticated } = useAuth();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
      logout();
      navigate('/');
    };

    return (
      <Masthead className="app-masthead">
        <MastheadMain>
          <MastheadBrand className="brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <Title headingLevel="h1" size="2xl" className="brand-title">
              🛍️ NexCart
            </Title>
          </MastheadBrand>
        </MastheadMain>
        <MastheadContent>
          <Toolbar isFullHeight>
            <ToolbarContent>
              <ToolbarItem className="search-toolbar-item">
                <SearchInput
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(_event, value) => setSearchValue(value)}
                  onClear={() => setSearchValue('')}
                  className="search-input"
                />
              </ToolbarItem>
              <ToolbarItem>
                <Button
                  variant="plain"
                  onClick={() => navigate('/cart')}
                  className="cart-button"
                  icon={<ShoppingCartIcon />}
                >
                  <Badge isRead={cartItemCount === 0}>{cartItemCount}</Badge>
                </Button>
              </ToolbarItem>
              <ToolbarItem>
                {isAuthenticated ? (
                  <Dropdown
                    isOpen={isUserMenuOpen}
                    onOpenChange={(isOpen) => setIsUserMenuOpen(isOpen)}
                    toggle={(toggleRef) => (
                      <MenuToggle
                        ref={toggleRef}
                        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                        isExpanded={isUserMenuOpen}
                        className="user-menu-toggle"
                      >
                        <Avatar src={user?.avatar} alt={user?.name || 'User'} size="sm" />
                        <span style={{ marginLeft: '0.5rem' }}>{user?.name}</span>
                      </MenuToggle>
                    )}
                  >
                    <DropdownList>
                      <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </DropdownList>
                  </Dropdown>
                ) : (
                  <>
                    <Button variant="link" onClick={() => navigate('/login')} className="auth-button">
                      Login
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/register')} className="auth-button">
                      Sign Up
                    </Button>
                  </>
                )}
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>
        </MastheadContent>
      </Masthead>
    );
  };

  return (
    <Page masthead={<HeaderComponent />} className="app-page">
      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            <PageSection className="hero-section">
              <div className="hero-content">
                <Title headingLevel="h1" size="4xl" className="hero-title">
                  Discover Amazing Products
                </Title>
                <p className="hero-subtitle">
                  Premium quality products at unbeatable prices. Shop the latest trends today!
                </p>
                <Button variant="primary" size="lg" className="hero-cta">
                  Shop Now
                </Button>
              </div>
            </PageSection>

            {/* Featured Products Banner */}
            {featuredProducts.length > 0 && (
              <PageSection className="featured-banner-section">
                <Banner className="featured-banner">
                  ⭐ Featured Products - Check out our handpicked selections!
                </Banner>
              </PageSection>
            )}

            {/* Filter Section */}
            <PageSection className="filter-section">
              <Toolbar>
                <ToolbarContent>
                  <ToolbarItem>
                    <FilterIcon /> <strong>Filter by Category:</strong>
                  </ToolbarItem>
                  <ToolbarItem>
                    <Select
                      isOpen={isCategoryOpen}
                      onOpenChange={(isOpen) => setIsCategoryOpen(isOpen)}
                      onSelect={(_event, value) => {
                        setSelectedCategory(value as string);
                        setIsCategoryOpen(false);
                      }}
                      selected={selectedCategory}
                      toggle={(toggleRef) => (
                        <MenuToggle ref={toggleRef} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                          {selectedCategory}
                        </MenuToggle>
                      )}
                    >
                      <SelectList>
                        {categories.map(category => (
                          <SelectOption key={category} value={category}>
                            {category}
                          </SelectOption>
                        ))}
                      </SelectList>
                    </Select>
                  </ToolbarItem>
                  <ToolbarItem>
                    <span className="product-count">
                      {filteredProducts.length} products found
                    </span>
                  </ToolbarItem>
                </ToolbarContent>
              </Toolbar>
            </PageSection>

            {/* Product Grid */}
            <PageSection className="products-section">
              <Grid hasGutter>
                {filteredProducts.map(product => (
                  <GridItem key={product.id} span={12} sm={6} md={4} lg={3}>
                    <ProductCard
                      product={product}
                      onAddToCart={handleAddToCart}
                      onViewDetails={handleViewDetails}
                    />
                  </GridItem>
                ))}
              </Grid>
              {filteredProducts.length === 0 && (
                <div className="no-products">
                  <Title headingLevel="h3">No products found</Title>
                  <p>Try adjusting your search or filter criteria</p>
                </div>
              )}
            </PageSection>

            {/* Footer */}
            <PageSection className="footer-section">
              <Grid hasGutter>
                <GridItem span={12} md={4}>
                  <Title headingLevel="h3" size="lg">About NexCart</Title>
                  <p>Your one-stop destination for premium products at amazing prices.</p>
                </GridItem>
                <GridItem span={12} md={4}>
                  <Title headingLevel="h3" size="lg">Customer Service</Title>
                  <ul className="footer-links">
                    <li>Contact Us</li>
                    <li>Shipping Info</li>
                    <li>Returns</li>
                    <li>FAQ</li>
                  </ul>
                </GridItem>
                <GridItem span={12} md={4}>
                  <Title headingLevel="h3" size="lg">Follow Us</Title>
                  <p>Stay connected on social media for exclusive deals!</p>
                </GridItem>
              </Grid>
              <div className="footer-bottom">
                <p>© 2025 NexCart. All rights reserved. Developed by Sasidharan ❤️</p>
              </div>
            </PageSection>
          </>
        } />
        <Route path="/cart" element={
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>

      {/* Shopping Cart Drawer */}
      <ShoppingCart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      {/* Product Detail Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
      />
    </Page>
  );
}

export default App;
