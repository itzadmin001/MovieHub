import axios from '../../utils/axios';
import { loadTv, removemTv } from '../Reducers/TvShowSlice';


export const fetchTv = (id) => async (dispatch , getState) => {
    try {
        const detail = await axios.get(`/tv/${id}`);
        const watchprovider = await axios.get(`tv/${id}/watch/providers`);
        const video = await axios.get(`/tv/${id}/videos`);
        const simillar = await axios.get(`/tv/${id}/similar`);
        const external = await axios.get(`/tv/${id}/external_ids`);
        const Recommendations = await axios.get(`/tv/${id}/recommendations`);
        const translations = await axios.get(`/tv/${id}/translations`);

        let alldeta = {
            detail : detail.data,
            watchprovider: watchprovider.data.results.IN,
            video: video.data.results.find((r) => r.type === "Trailer"),
            simillar: simillar.data.results,
            external: external.data,  
            Recommendations: Recommendations.data.results,
            translations: translations.data.translations.map((t) => t.name),

        };
        dispatch(loadTv(alldeta));

    } catch (error) {
        console.error(error);
    }
};
