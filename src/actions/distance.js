import { getPostalCodes, getPostalCodePrefixes } from '../resources/hardCodedData';


// Returns the distance in km between the two given lat, lon coordinates
// From https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-lonitude-points-haversine-formula
const distance = (lat1, lon1, lat2, lon2) => {
    let p = 0.017453292519943295;    // Math.PI / 180
    let c = Math.cos;
    let a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
  
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}


// Returns the distance in km between the two postal codes
export const getDistance = (postalCode1, postalCode2) => {
    const postalCodes = getPostalCodes();
    // Get the lat and lon coordinates of the two postal codes
    const lat1 = postalCodes[postalCode1].lat;
    const lon1 = postalCodes[postalCode1].lon;
    const lat2 = postalCodes[postalCode2].lat;
    const lon2 = postalCodes[postalCode2].lon;
    return distance(lat1, lon1, lat2, lon2);
}


// Returns a list containing of locations and their distance from <targetPostalCode>
// sorted from closest to farthest away from <targetPostalCode>
export const getNearbyLocations = (targetPostalCode) => {
    const postalCodePrefixes = getPostalCodePrefixes();
    const postalCodeToDistance = postalCodePrefixes.map(pcp => {
        console.log(pcp, targetPostalCode)
        return { 
            postalCode: pcp, 
            distance: getDistance(pcp, targetPostalCode)
        }
    });
    postalCodeToDistance.sort((p1, p2) => {
        return p1.distance - p2.distance;
    })
    console.log(postalCodeToDistance)
    return postalCodeToDistance;
}