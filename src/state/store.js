import {
    configureStore,
    combineReducers,
    getDefaultMiddleware,
  } from '@reduxjs/toolkit';
  import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import storage from 'redux-persist/lib/storage';
  import restaurantsReducer from './slices/restarauntsSlice';

  const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['restaurants'],
  }

  const persistedReducer = persistReducer(
    persistConfig,
    combineReducers({
      restaurants: restaurantsReducer,
    }),
  )

  export default () => {
    const store = configureStore({
      reducer: persistedReducer,
      middleware: getDefaultMiddleware({
        /// Code to make redux-persist and redux-toolkit compatible
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    })
    const persistor = persistStore(store)
  
    return { store, persistor }
  }