import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
const AddCategory = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({ category: "",})
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
        formdata.append("category", data.category)
        formdata.append("image", image)
        const response = await axios.post(`${url}/api/food/add-category`, formdata);
        if (response.data.success) {
            setData({
                category: ""
            })
            setImage(false);
            await fetchCategory();
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    }
    const removeCategory = async (categoryId) => {
        const response = await axios.post(`${url}/api/food/remove-category`, { id: categoryId });
        await fetchCategory();
        if (response.data.success) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      }
      
    useEffect(() => {
        fetchCategory();
    }, [])

    return (
        <div className='flex-col'>
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
                        <p>category</p>
                        <input onChange={onChangeHandler} value={data.category} type="text" name="category" required placeholder='type here' />
                    </div>

                    <button type='submit' className='add-button'>Add category</button>
                </form>
            </div>
            <div className='list add flex-col'>
                <p>All Category List</p>
                <div className="list-table">
                    <div className="list-table-format category title">
                        <b>Image</b>
                        <b>Category</b>
                        <b>Actions</b>
                    </div>
                    {category.map((item, index) => {
                        return (
                            <div key={index} className='list-table-format category'>
                                <img src={`${url}/images/` + item.image} alt={item.category} />
                                <p>{item.category}</p>
                                <p onClick={() => removeCategory(item._id)} className='cross'>x</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <br />
        </div>
    )
}

export default AddCategory
