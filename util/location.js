const API_KEY = 'AIzaSyDR65hxh0Qrv3Xsb775Q_BSUgG_AvhkNEA'
const KEY = '7rkQbNAN9Eq7FNxx3AhkPkuw6O2CxJja'

export function getMapPreview(lat,lng){
    // const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${API_KEY}`;
    const imagePreviewUrl = `https://www.mapquestapi.com/staticmap/v5/map?key=${KEY}&center=${lat},${lng}&size=400,200@2x`
    return imagePreviewUrl;
}

export async function getAddress(lat,lng){
    const locationUrl = `http://www.mapquestapi.com/geocoding/v1/reverse?key=${KEY}&location=${lat},${lng}&includeRoadMetadata=true&includeNearestIntersection=true`
    
    const response = await fetch(locationUrl)
    if(!response){
        throw new Error('Failed to fetch address, try again later')
    }
    const data = await response.json()
    
   const address = data.results[0].locations[0].adminArea5 + " , " + data.results[0].locations[0].adminArea3
    return address


}
