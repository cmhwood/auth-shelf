import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function ShelfPage() {
  const shelf = useSelector((store) => store.shelf);
  const dispatch = useDispatch();
  let [newItem, setNewItem] = useState({
    description: '',
    image_url: '',
  });

  let [isEditing, setIsEditing] = useState([false]);
  let [rowToEdit, setRowToEdit] = useState(null);

  useEffect(() => {
    dispatch({ type: 'FETCH_SHELF' });
  }, []);

  const handleNewItem = (event) => {
    if (event.target.id === 'description') {
      setNewItem({ ...newItem, description: event.target.value });
    } else if (event.target.id === 'url') {
      setNewItem({ ...newItem, image_url: event.target.value });
    }
    return newItem;
  };

  const addItem = () => {
    console.log('submit clicked');
    dispatch({
      type: 'ADD_ITEM',
      payload: { description: newItem.description, image_url: newItem.image_url },
    });
    dispatch({ type: 'FETCH_ITEMS' });
  };

  const deleteItem = (itemID) => {
    dispatch({ type: 'DELETE_ITEM', payload: itemID }); // DELETE_ITEM from the shelf saga
  };
  const toggleEdit = (rowID) => {
    setRowToEdit(rowToEdit === rowID ? null : rowID);
  };

  const rowBeingEdited = (rowID) => {
    return rowToEdit === rowID;
  };

  return (
    <>
      <h2>Shelf</h2>
      <div className='container'>
        <section>
          <form onSubmit={addItem}>
            <input id='description' placeholder='description' onChange={handleNewItem} />
            <input id='url' placeholder='url' onChange={handleNewItem} />
            <button type='submit'>Submit</button>
          </form>
        </section>
        <table>
          <tbody>
            <tr>
              <th>description</th>
              <th>image</th>
            </tr>

            {shelf.map((item) => (
              <tr key={item.id}>
                <td>
                  {isEditing ? (
                    <p>{item.description}</p>
                  ) : (
                    <input defaultValue={item.description}></input>
                  )}
                  {/* <p>{item.description}</p>{item.description}</p> */}
                </td>
                <td>
                  <img src={item.image_url} style={{ width: '15rem', height: '20rem' }} />
                </td>
                <td>
                  {isEditing ? (
                    <button onClick={() => toggleEdit(item.id)}>Edit</button>
                  ) : (
                    <button onClick={toggleEdit}>Save</button>
                  )}
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default ShelfPage;
