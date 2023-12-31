import ReactDOM from 'react-dom/client'
import './index.css'
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routers from './routes/App.jsx';
import { AuthProvider } from './components/authContext/index.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <AuthProvider>
        <Routers />
      </AuthProvider>
    </PersistGate>
  </Provider>,
)
