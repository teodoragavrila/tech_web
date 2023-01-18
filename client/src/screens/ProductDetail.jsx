import React, {useEffect, useState} from 'react'
import { Card, Button, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import axios from 'axios'
import { useNavigate } from 'react-router'

const ProductDetail = () => {
    const history = useNavigate()
    const {id} = useParams()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)

    useEffect(()=> {

        const getSingleProductData = async () => {
            const {data} = await axios.get(`http://localhost:8080/api/products/${id}`)
            console.log(data)

            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
            setPublished(data.published)

        }
        getSingleProductData()

    }, [id])

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8080/api/products/${id}`)
        history('/products')
    }

    return (
        <>
        <Container className='mt-10 p-4'>
        <h1 className='text-center'>Detail Product</h1>
        <hr />

        <Card className="shadow-sm rounded" style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>Title: {title}</Card.Title>
                <Card.Title>Price: ${price} </Card.Title>
                <Card.Text>
                Description: {description}
                </Card.Text>
                <Card.Text>
                Published: {published ? (<small>True</small>) : (<small>False</small>)}
                </Card.Text>
                <br />
                <Link to={`/product/edit/${id}`}>
                    <Button>Edit</Button>
                </Link>
                <Link to={`/product/${id}`}>
                    <Button className='btn btn-danger m-2' onClick={()=> handleDelete(id)}>Delete</Button>
                </Link>
            </Card.Body>
        </Card>
        </Container>
        </>
    )
}

export default ProductDetail