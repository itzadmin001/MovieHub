import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    info: null
};
export const TvShowSlice = createSlice({

    name: 'TvShow',
    initialState,

    reducers: {
        loadTv: (state , action) =>{
            state.info = action.payload
        },
        removeTv: (state , action) =>{
            state.info = null
        }

    },
})

export const { loadTv , removeTv} = TvShowSlice.actions

export default TvShowSlice.reducer