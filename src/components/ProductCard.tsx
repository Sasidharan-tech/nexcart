import { Card, CardBody, CardFooter, CardTitle, Button } from '@patternfly/react-core';
import { ShoppingCartIcon, StarIcon } from '@patternfly/react-icons';
import { type Product } from '../data/products';
import './ProductCard.css';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
    onViewDetails: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetails }) => {
    return (
        <Card
            isClickable
            className="product-card"
            onClick={() => onViewDetails(product)}
        >
            <div className="product-image" style={{ background: product.image }}>
                {product.featured && <div className="featured-badge">Featured</div>}
                {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}
            </div>
            <CardTitle className="product-title">{product.name}</CardTitle>
            <CardBody className="product-body">
                <div className="product-rating">
                    <StarIcon className="star-icon" />
                    <span className="rating-value">{product.rating}</span>
                    <span className="review-count">({product.reviews} reviews)</span>
                </div>
                <p className="product-category">{product.category}</p>
            </CardBody>
            <CardFooter className="product-footer">
                <div className="product-price">${product.price.toFixed(2)}</div>
                <Button
                    variant="primary"
                    icon={<ShoppingCartIcon />}
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(product);
                    }}
                    isDisabled={!product.inStock}
                    className="add-to-cart-btn"
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
};
