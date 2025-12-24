import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerContentBody, DrawerPanelContent, DrawerHead, DrawerActions, DrawerCloseButton, Button, Title, EmptyState, EmptyStateBody } from '@patternfly/react-core';
import { ShoppingCartIcon, TrashIcon, MinusIcon, PlusIcon } from '@patternfly/react-icons';
import type { Product } from '../data/products';
import './ShoppingCart.css';

export interface CartItem extends Product {
    quantity: number;
}

interface ShoppingCartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemoveItem: (productId: number) => void;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
    isOpen,
    onClose,
    cartItems,
    onUpdateQuantity,
    onRemoveItem
}) => {
    const navigate = useNavigate();
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const panelContent = (
        <DrawerPanelContent className="cart-panel">
            <DrawerHead>
                <Title headingLevel="h2" size="xl" className="cart-title">
                    <ShoppingCartIcon className="cart-icon" /> Shopping Cart
                </Title>
                <DrawerActions>
                    <DrawerCloseButton onClick={onClose} />
                </DrawerActions>
            </DrawerHead>
            <DrawerContentBody className="cart-body">
                {cartItems.length === 0 ? (
                    <EmptyState className="empty-cart">
                        <Title headingLevel="h4" size="lg">
                            Your cart is empty
                        </Title>
                        <EmptyStateBody>
                            Add some products to get started!
                        </EmptyStateBody>
                    </EmptyState>
                ) : (
                    <>
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-image" style={{ background: item.image }} />
                                    <div className="cart-item-details">
                                        <h4 className="cart-item-name">{item.name}</h4>
                                        <p className="cart-item-price">${item.price.toFixed(2)}</p>
                                        <div className="quantity-controls">
                                            <Button
                                                variant="plain"
                                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                icon={<MinusIcon />}
                                                className="quantity-btn"
                                            />
                                            <span className="quantity-value">{item.quantity}</span>
                                            <Button
                                                variant="plain"
                                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                                icon={<PlusIcon />}
                                                className="quantity-btn"
                                            />
                                        </div>
                                    </div>
                                    <Button
                                        variant="plain"
                                        onClick={() => onRemoveItem(item.id)}
                                        icon={<TrashIcon />}
                                        className="remove-btn"
                                        aria-label="Remove item"
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="cart-footer">
                            <div className="cart-total">
                                <span className="total-label">Total:</span>
                                <span className="total-amount">${total.toFixed(2)}</span>
                            </div>
                            <Button
                                variant="secondary"
                                isBlock
                                className="view-cart-btn"
                                onClick={() => {
                                    onClose();
                                    navigate('/cart');
                                }}
                            >
                                View Full Cart
                            </Button>
                            <Button variant="primary" isBlock className="checkout-btn">
                                Proceed to Checkout
                            </Button>
                        </div>
                    </>
                )}
            </DrawerContentBody>
        </DrawerPanelContent>
    );

    return (
        <Drawer isExpanded={isOpen} onExpand={onClose} position="right">
            <DrawerContent panelContent={panelContent}>
                <DrawerContentBody />
            </DrawerContent>
        </Drawer>
    );
};
