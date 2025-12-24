import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    PageSection,
    Title,
    Button,
    Grid,
    GridItem,
    Card,
    CardBody,
    EmptyState,
    EmptyStateBody,
    TextInput,
    Divider,
    Breadcrumb,
    BreadcrumbItem,
} from '@patternfly/react-core';
import {
    ShoppingCartIcon,
    TrashIcon,
    MinusIcon,
    PlusIcon,
    TagIcon,
} from '@patternfly/react-icons';
import type { CartItem } from '../components/ShoppingCart';
import './CartPage.css';

interface CartPageProps {
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemoveItem: (productId: number) => void;
}

export const CartPage: React.FC<CartPageProps> = ({
    cartItems,
    onUpdateQuantity,
    onRemoveItem,
}) => {
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.1; // 10% tax
    const shipping = subtotal > 100 ? 0 : 9.99; // Free shipping over $100
    const discount = promoApplied ? subtotal * 0.1 : 0; // 10% discount if promo applied
    const total = subtotal + tax + shipping - discount;

    const handleApplyPromo = () => {
        if (promoCode.toUpperCase() === 'SAVE10') {
            setPromoApplied(true);
        }
    };

    if (cartItems.length === 0) {
        return (
            <PageSection className="cart-page">
                <Breadcrumb className="cart-breadcrumb">
                    <BreadcrumbItem to="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                        Home
                    </BreadcrumbItem>
                    <BreadcrumbItem isActive>Shopping Cart</BreadcrumbItem>
                </Breadcrumb>

                <EmptyState className="empty-cart-page">
                    <ShoppingCartIcon style={{ fontSize: '5rem', color: '#667eea', marginBottom: '1rem' }} />
                    <Title headingLevel="h1" size="2xl">
                        Your cart is empty
                    </Title>
                    <EmptyStateBody>
                        Looks like you haven't added anything to your cart yet. Start shopping to find amazing products!
                    </EmptyStateBody>
                    <Button variant="primary" size="lg" onClick={() => navigate('/')} className="continue-shopping-btn">
                        Start Shopping
                    </Button>
                </EmptyState>
            </PageSection>
        );
    }

    return (
        <PageSection className="cart-page">
            <Breadcrumb className="cart-breadcrumb">
                <BreadcrumbItem to="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem isActive>Shopping Cart</BreadcrumbItem>
            </Breadcrumb>

            <Title headingLevel="h1" size="3xl" className="cart-page-title">
                <ShoppingCartIcon className="cart-title-icon" /> Shopping Cart
            </Title>
            <p className="cart-subtitle">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>

            <Grid hasGutter className="cart-grid">
                {/* Cart Items Section */}
                <GridItem span={12} lg={8}>
                    <div className="cart-items-section">
                        {cartItems.map((item) => (
                            <Card key={item.id} className="cart-item-card">
                                <CardBody>
                                    <div className="cart-item-content">
                                        <div className="cart-item-image-wrapper">
                                            <div className="cart-item-image" style={{ background: item.image }} />
                                        </div>
                                        <div className="cart-item-info">
                                            <Title headingLevel="h3" size="lg" className="cart-item-name">
                                                {item.name}
                                            </Title>
                                            <p className="cart-item-description">{item.description}</p>
                                            <p className="cart-item-category">Category: {item.category}</p>
                                            <div className="cart-item-price-mobile">
                                                <span className="price-label">Price:</span>
                                                <span className="price-value">${item.price.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="cart-item-actions">
                                            <div className="cart-item-price-desktop">
                                                <span className="price-value">${item.price.toFixed(2)}</span>
                                            </div>
                                            <div className="quantity-controls-wrapper">
                                                <label className="quantity-label">Quantity:</label>
                                                <div className="quantity-controls">
                                                    <Button
                                                        variant="plain"
                                                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        icon={<MinusIcon />}
                                                        className="quantity-btn"
                                                        aria-label="Decrease quantity"
                                                    />
                                                    <span className="quantity-value">{item.quantity}</span>
                                                    <Button
                                                        variant="plain"
                                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                        icon={<PlusIcon />}
                                                        className="quantity-btn"
                                                        aria-label="Increase quantity"
                                                    />
                                                </div>
                                            </div>
                                            <div className="item-total">
                                                <span className="total-label">Total:</span>
                                                <span className="total-value">${(item.price * item.quantity).toFixed(2)}</span>
                                            </div>
                                            <Button
                                                variant="plain"
                                                onClick={() => onRemoveItem(item.id)}
                                                icon={<TrashIcon />}
                                                className="remove-item-btn"
                                                aria-label="Remove item"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </div>
                </GridItem>

                {/* Order Summary Section */}
                <GridItem span={12} lg={4}>
                    <Card className="order-summary-card">
                        <CardBody>
                            <Title headingLevel="h2" size="xl" className="summary-title">
                                Order Summary
                            </Title>
                            <Divider className="summary-divider" />

                            <div className="promo-code-section">
                                <label className="promo-label">
                                    <TagIcon /> Promo Code
                                </label>
                                <div className="promo-input-wrapper">
                                    <TextInput
                                        type="text"
                                        value={promoCode}
                                        onChange={(_event, value) => setPromoCode(value)}
                                        placeholder="Enter code"
                                        className="promo-input"
                                        isDisabled={promoApplied}
                                    />
                                    <Button
                                        variant="secondary"
                                        onClick={handleApplyPromo}
                                        isDisabled={promoApplied || !promoCode}
                                        className="apply-promo-btn"
                                    >
                                        {promoApplied ? 'Applied' : 'Apply'}
                                    </Button>
                                </div>
                                {promoApplied && (
                                    <p className="promo-success">✓ Promo code applied successfully!</p>
                                )}
                                {!promoApplied && (
                                    <p className="promo-hint">Try code: SAVE10</p>
                                )}
                            </div>

                            <Divider className="summary-divider" />

                            <div className="summary-details">
                                <div className="summary-row">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax (10%):</span>
                                    <span>${tax.toFixed(2)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping:</span>
                                    <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                                </div>
                                {promoApplied && (
                                    <div className="summary-row discount-row">
                                        <span>Discount (10%):</span>
                                        <span>-${discount.toFixed(2)}</span>
                                    </div>
                                )}
                            </div>

                            <Divider className="summary-divider" />

                            <div className="summary-total">
                                <span className="total-label">Total:</span>
                                <span className="total-amount">${total.toFixed(2)}</span>
                            </div>

                            <Button variant="primary" isBlock className="checkout-btn">
                                Proceed to Checkout
                            </Button>
                            <Button variant="link" isBlock onClick={() => navigate('/')} className="continue-shopping-link">
                                Continue Shopping
                            </Button>

                            <div className="shipping-notice">
                                {shipping > 0 && (
                                    <p>💡 Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!</p>
                                )}
                                {shipping === 0 && (
                                    <p>✓ You qualify for FREE shipping!</p>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </Grid>
        </PageSection>
    );
};
