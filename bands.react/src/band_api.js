
export const getAllBands = (callback) => {

    // api call to get the list of bands, takes no parameters 
    // (But could take a match in a future enhancement)
    fetch('/api/bands', {  
        headers: {
        'Accept': 'application/json',
        }
    })
    .then((resp) => resp.json()) // Transform the return value a object
    .then((data) => callback(data))
}

export const getAlbumsForBand = (band, callback) => {
    
    // api call for the albums, generate the band parameter manually here
    // because it's less code :) 
    // fetch does allow get paramters to be passed via an object but I'd rather 
    // talk about it than actually do it... 
    fetch('/api/albums?band=' + band, {  
        headers: {
        'Accept': 'application/json',
        }
    })
    .then((resp) => resp.json()) 
    .then((data) => callback(data))
}