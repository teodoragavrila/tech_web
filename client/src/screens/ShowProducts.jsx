import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Container, Row, Col, Button} from 'react-bootstrap'
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const ShowProducts = () => {

    const [products, setProducts] = useState([])
    useEffect(()=> {
        const getProductsData = async () => {
            const {data} = await axios.get('http://localhost:8080/api/products/allProducts')
            console.log(data)
            setProducts(data)
        }
        getProductsData()
    },[])
 return (
    <>
    <Container className='justify-content-center mt-2 mb-2 p-2'>
        <h1 className='text-center'>Show All Products</h1>
        <Link to="/addProduct">
        <Button>Add Product</Button>
        </Link>
        <hr />

        <Row>
        {
        products.map(product => {
            return <Col md={8} lg={12} sm={12} key={product.id} className='mb-3'>
                <ProductCard product={product}/>
            </Col>
        })
    }
        </Row>
    </Container>
    </>
)
}

export default ShowProducts