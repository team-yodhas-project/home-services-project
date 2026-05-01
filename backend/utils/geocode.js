import axios from 'axios';

const geocodeAddress=async(address)=>{
    try{
        const url=`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
        const response=await axios.get(url);

        if(response.data && response.data.length>0){
            const {lat,lon}=response.data[0];
            return {
                type:'Point',
                coordinates:[parseFloat(lon),parseFloat(lat)],
                formattedAddress:response.data[0].display_name
            };
        }
        return null;
    }
    catch(err){
        console.error('Geocoding error:',err.message);
        return null;
    }
}
export default geocodeAddress;