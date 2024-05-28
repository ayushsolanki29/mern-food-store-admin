import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
const Add = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    })
    const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
        const response = await axios.get(`${url}/api/food/fetch-category`)
        if (response.data.success) {
            setCategory(response.data.data)
        } else {
            toast.error(response.data.message);
        }
    }
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append("name", data.name)
        formdata.append("description", data.description)
        formdata.append("price", Number(data.price))
        formdata.append("category", data.category)
        formdata.append("image", image)
        const response = await axios.post(`${url}/api/food/add`, formdata);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Salad"
            })
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }
    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Uplaod Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" required placeholder='type here' />
                </div>
                <div className="add-product-dec flex-col">
                    <p>Product description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" rows={6} placeholder='Write content here' required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name="category">
                            <option value="" selected>Select Category</option>
                            {category.map((cat, index) => {
                                return (
                                    <option key={index} value={cat.category}>{cat.category}</option>
                                )
                            })}



                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='e.g. ₹200' />
                    </div>

                </div>
                <button type='submit' className='add-button'>Add Product</button>
            </form>
        </div>
    )
}

export default Add
