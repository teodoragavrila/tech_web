import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Container, Form, Button} from 'react-bootstrap'
import {useNavigate, useParams} from 'react-router'



const EditProduct = ()=> {

    const { id } = useParams()
    const history = useNavigate()

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [published, setPublished] = useState(true)

    useEffect(()=> {
        const getDataById = async () => {
            const {data} = await axios.get(`http://localhost:8080/api/products/${id}`)
            setTitle(data.title)
            setPrice(data.price)
            setDescription(data.description)
            setPublished(data.published)
        }
        getDataById()

    }, [id])

    const updateHandler = async (e) => {
        e.preventDefault()

        const data ={
            title: title,
            price: price,
            description: description,
            published: published
        }

        await axios.put(`http://localhost:8080/api/products/${id}`, data)

        history('/products')
    }
    return (
        <>
         <Container className='mt-5 p-2'>
                <h1>Update Product</h1>
                <hr />

                <Form onSubmit={updateHandler}>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                          />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price ($)</Form.Label>
                        <Form.Control
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            type="number"
                             />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            as="textarea"
                            />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="publishedCheckedid">
                        <Form.Check
                            type="checkbox"
                            value={published}
                            onChange={(e) => setPublished(e.target.checked)}
                            label="publish"
                           />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Update Product
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default EditProduct