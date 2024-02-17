import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useGetProductsQuery } from '../../features/products/productApi';
import { useAppDispatch } from '../../app/store';
import { addToBasket } from '../../features/basket/basketSlice';
import { toast } from 'react-toastify';
import { ProductType } from '../../types';

const MainPage = () => {
  const { data, isLoading, error } = useGetProductsQuery();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return (
      <div className="spinner fs-5">
        <Spinner animation="border" role="status"></Spinner>
      </div>
    );
  }
  if (error) {
    return <div className="spinner">Ürünler yüklenirken bir hata oluştu</div>;
  }

  //sepete ekleme
  const handleAddToBasket = (product: ProductType) => {
    dispatch(addToBasket(product));
    toast.success(`${product.title} sepete eklendi.`, {
      position: 'top-right',
    });
  };

  return (
    <div className="mt-5">
      <Container className="my-4">
        <Row xs={1} md={2} lg={3} xl={4}>
          {data?.products.map((product) => (
            <Col key={product?.id} className="mb-4">
              <Card className="text-center card">
                <Card.Img
                  style={{
                    width: '250px',
                    height: '200px',
                    padding: '10px',
                    borderRadius: '20px',
                  }}
                  variant="top"
                  src={product?.images[0]}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>
                    {product?.title.length > 12
                      ? product?.title.slice(0, 12) + '... daha fazla'
                      : product?.title}
                  </Card.Title>
                  <Card.Text>
                    {product?.description.length > 40
                      ? product?.description.slice(0, 40) + '... daha fazla'
                      : product?.description}
                  </Card.Text>
                  <Card.Text className="text-success fw-bold">
                    $ {product?.price}
                  </Card.Text>

                  <Button
                    onClick={() => handleAddToBasket(product)}
                    variant="primary"
                  >
                    Sepete Ekle
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;
