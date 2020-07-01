import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'restaurants',
    initialState: {
        listOfRestaurants: []
    },
    reducers: {
        setRestaurants: (state, action) => {
            state.listOfRestaurants = action.payload.listOfRestaurants
        }
    }

})

export const { setRestaurants } = slice.actions

export const setRestaurantsAsync = (listOfRestaurants) => (dispatch) => {

    setTimeout(() => {
        dispatch(
            setRestaurants({
                listOfRestaurants
            })
        )
    }, 1000)
}

export const selectRestaurants = (state) => state.restaurants.listOfRestaurants
