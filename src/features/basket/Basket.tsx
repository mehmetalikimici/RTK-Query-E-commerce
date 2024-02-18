import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { ButtonGroup, ListGroup } from 'react-bootstrap';
import {
  clearBasket,
  decrementItem,
  incrementItem,
  removeFromBasket,
} from './basketSlice';
import { ProductType } from '../../types';
import { toast } from 'react-toastify';

function Basket() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.basket.products);

  //sepete eklenen ürün sayısı
  const totalAmount: number = products.reduce(
    (total, item) => total + item.amount!,
    0
  );

  //toplam fiyatı hesaplama
  const getTotalPrice = (): string => {
    return products
      .reduce((total, item) => total + item.price * item.amount!, 0)
      .toFixed(2);
  };

  //sepetten ürün silme
  const handleRemoveFromBasket = (product: ProductType) => {
    dispatch(removeFromBasket(product));
    toast.error(`${product.title} sepetten silindi.`);
  };

  //sepeti temizleme
  const handleClearBasket = () => {
    dispatch(clearBasket());
    handleClose();
    toast.warn('Sepet tüm ürünler kaldırıldı.');
  };

  //siparişi onaylama
  const handleConfirm = () => {
    dispatch(clearBasket());
    handleClose();
    toast.info('Alışveriş tamamlandı !');
  };

  //ürün adedini arttırma
  const handleIncrement = (id: number) => {
    dispatch(incrementItem(id));
  };

  const handleDecrement = (id: number) => {
    dispatch(decrementItem(id));

    // Ürün miktarı 0'a düştüğünde sepetten kaldır
    const deleted = products.find((product) => product.id === id);
    if (deleted && deleted.amount === 1) {
      handleRemoveFromBasket(deleted);
    }
  };

  //modal'ın açılıp kapanması için tutulan state
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Sepet
        <span className="ms-2 px-2 py-1 text-bg-danger rounded">
          {totalAmount}
        </span>
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-black">Seçilen Ürünler</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {products.length == 0 && (
            <div className="text-black">Sepette ürün bulunmamaktadır.</div>
          )}
          <ListGroup>
            {products.map((product) => (
              <ListGroup.Item
                key={product.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center gap-2">
                  <img
                    height={32}
                    width={40}
                    src={product.images[0]}
                    alt="ürün-resmi"
                  />
                  {product.title} - Miktar: {product.amount}
                </div>
                <ButtonGroup>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleIncrement(product.id)}
                  >
                    +
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleDecrement(product.id)}
                  >
                    -
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFromBasket(product)}
                  >
                    Sil
                  </Button>
                </ButtonGroup>
              </ListGroup.Item>
            ))}
          </ListGroup>
          {products.length > 0 && (
            <div>
              <span className="fs-5 bg-transparent text-black d-flex justify-content-center mt-3">
                Toplam: ${getTotalPrice()}
              </span>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClearBasket}
            disabled={products.length == 0 ? true : false}
          >
            Sepeti Temizle
          </Button>
          <Button
            variant="primary"
            disabled={products.length == 0 ? true : false}
            onClick={handleConfirm}
          >
            Siparişi Onayla
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Basket;
