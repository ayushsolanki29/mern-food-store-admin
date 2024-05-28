import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

const Users = ({ url }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/user/fetchUsers`)
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error(response.data.message);
    }
  }

  const removeFood = async (foodID) => {
    const confirm = window.confirm("are you sure want to delete ?");
    if (confirm) {
      const response = await axios.post(`${url}/api/user/remove-user`, { id: foodID });
      await fetchList();
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("you cancel the delete operation");
    }

  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list add flex-col'>
      <p>All Users List</p>
      <div className="list-table">
        <div className="list-table-format user title" >
          <b>Name</b>
          <b>email</b>
          <b>Total Orders</b>
          <b>Actions</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className='list-table-format user' >
              <p>{item.name}  </p>
              <p>{item.email}</p>
              <p>comming soon</p>
              <p onClick={() => removeFood(item._id)} className='cross'>x</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Users
