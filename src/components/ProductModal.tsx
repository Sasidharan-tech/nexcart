import { Modal, ModalVariant, Button, Title, Label } from '@patternfly/react-core';
import { StarIcon, ShoppingCartIcon } from '@patternfly/react-icons';
import { type Product } from '../data/products';
import './ProductModal.css';
import { useState } from 'react';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
    isOpen,
    onClose,
    product,
    onAddToCart
}) => {
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState<string>('');

    if (!product) return null;

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        onClose();
        setQuantity(1);
    };

    return (
        <Modal
            variant={ModalVariant.large}
            title=""
            isOpen={isOpen}
            onClose={onClose}
            className="product-modal"
        >
            <div className="modal-content">
                <div className="modal-image-section">
                    <div className="modal-product-image" style={{ background: product.image }} />
                </div>
                <div className="modal-details-section">
                    <div className="modal-header">
                        <Title headingLevel="h2" size="2xl" className="modal-product-name">
                            {product.name}
                        </Title>
                        {product.featured && (
                            <Label color="purple" className="featured-label">Featured</Label>
                        )}
                    </div>

                    <div className="modal-rating">
                        <StarIcon className="modal-star-icon" />
                        <span className="modal-rating-value">{product.rating}</span>
                        <span className="modal-review-count">({product.reviews} reviews)</span>
                    </div>

                    <div className="modal-price">${product.price.toFixed(2)}</div>

                    <p className="modal-description">{product.description}</p>

                    <div className="modal-category">
                        <strong>Category:</strong> {product.category}
                    </div>

                    {product.colors && product.colors.length > 0 && (
                        <div className="modal-options">
                            <strong>Available Colors:</strong>
                            <div className="color-options">
                                {product.colors.map((color) => (
                                    <Button
                                        key={color}
                                        variant={selectedColor === color ? 'primary' : 'secondary'}
                                        onClick={() => setSelectedColor(color)}
                                        className="color-btn"
                                    >
                                        {color}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="modal-quantity">
                        <strong>Quantity:</strong>
                        <div className="quantity-selector">
                            <Button
                                variant="plain"
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="qty-btn"
                            >
                                -
                            </Button>
                            <span className="qty-display">{quantity}</span>
                            <Button
                                variant="plain"
                                onClick={() => setQuantity(quantity + 1)}
                                className="qty-btn"
                            >
                                +
                            </Button>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <Button
                            variant="primary"
                            icon={<ShoppingCartIcon />}
                            onClick={handleAddToCart}
                            isDisabled={!product.inStock}
                            className="modal-add-to-cart"
                            isBlock
                        >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </div>

                    {!product.inStock && (
                        <div className="stock-warning">
                            This product is currently out of stock
                        </div>
                    )}
                </div>
            </div>
        </Modal>
    );
};
