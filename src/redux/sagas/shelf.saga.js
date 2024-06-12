import axios from 'axios';

// saga to get shelf items
function* fetchShelf() {
  try {
    const response = yield axios.get('/api/shelf');
    yield put({ type: 'SET_SHELF', payload: response.data });
  } catch (error) {
    console.error('Error getting shelf');
  }
}

// saga to delete shelf items
function* deleteItem(action) {
  try {
    yield axios.delete(`api/shelf/${action.payload}`);
    yield put({ type: 'SET_SHELF' });
  } catch {
    console.log('error deleting item', error);
  }
}

// saga to add shelf items
function* addItem(action) {
  try {
    yield axios.post('/api/shelf', action.payload);
    yield put({ type: 'FETCH_SHELF' });
  } catch (error) {
    console.error(`Error adding new item`);
  }
}

function* shelfSaga() {
  yield takeEvery('DELETE_ITEM', deleteItem);
  yield takeEvery('ADD_ITEM', addItem);
}

export default shelfSaga;
