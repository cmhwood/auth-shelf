import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

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
    yield put({ type: 'FETCH_SHELF' });
  } catch {
    console.log('error deleting item', error);
  }
}

// saga to add shelf items
function* addItem(action) {
  try {
    yield axios.post('/api/shelf', {
      description: action.payload.description,
      image_url: action.payload.image_url,
    });
    yield put({ type: 'FETCH_SHELF' });
  } catch (error) {
    console.error(`Error adding new item`);
  }
}

function* shelfSaga() {
  yield takeEvery('DELETE_ITEM', deleteItem);
  yield takeEvery('ADD_ITEM', addItem);
  yield takeEvery('FETCH_SHELF', fetchShelf);
}

export default shelfSaga;
