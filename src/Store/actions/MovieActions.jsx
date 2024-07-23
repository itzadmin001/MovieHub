import axios from '../../utils/axios';
import { loadmovie, removemovie } from '../Reducers/MovieSlice';


export const fetchmovie = (id) => async (dispatch , getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const watchprovider = await axios.get(`movie/${id}/watch/providers`);
        const video = await axios.get(`/movie/${id}/videos`);
        const simillar = await axios.get(`/movie/${id}/similar`);
        const external = await axios.get(`/movie/${id}/external_ids`);
        const Recommendations = await axios.get(`/movie/${id}/recommendations`);
        const translations = await axios.get(`/movie/${id}/translations`);

        let alldeta = {
            detail : detail.data,
            watchprovider: watchprovider.data.results.IN,
            video: video.data.results.find((r) => r.type === "Trailer"),
            simillar: simillar.data.results,
            external: external.data,  
            Recommendations: Recommendations.data.results,
            translations: translations.data.translations.map((t) => t.name),

        };
        dispatch(loadmovie(alldeta));

    } catch (error) {
        console.error(error);
    }
};
