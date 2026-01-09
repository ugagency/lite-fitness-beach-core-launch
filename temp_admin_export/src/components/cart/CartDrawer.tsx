import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, totalPrice } = useCart();

  if (!isOpen) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-foreground/20 z-50 animate-fade-in"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-medium tracking-wide uppercase">Carrinho</h2>
          <button onClick={() => setIsOpen(false)} className="p-2 -mr-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-6">Seu carrinho está vazio</p>
            <button
              onClick={() => setIsOpen(false)}
              className="btn-secondary"
            >
              Continuar comprando
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-6">
                {items.map((item, index) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-28 object-cover bg-secondary"
                    />
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-medium text-sm">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {item.size} / {item.color}
                      </p>
                      <p className="text-sm font-medium mt-2">
                        {formatPrice(item.product.price)}
                      </p>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                            className="p-2"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                            className="p-2"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.product.id, item.size, item.color)}
                          className="text-xs text-muted-foreground underline"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-border">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm uppercase tracking-wide">Subtotal</span>
                <span className="text-lg font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={() => setIsOpen(false)}
                className="btn-primary w-full block text-center"
              >
                Finalizar compra
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className="w-full text-center text-sm mt-4 underline"
              >
                Continuar comprando
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
