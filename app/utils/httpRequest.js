const httpRequest = async (endPoint, method, requestData) => 
{

    let params = // PARAMETERS TO SENT TO SERVER WITH HTTP REQUEST.
    {
        method: method,
        headers:
            {
                Authorization: `Bearer Zl49StyUu9721TFoRHfDqGmEVikCKNhJayGUgDvK`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
    }

    // IF REQUEST DATA WAS PROVIDED AND THE METHOD IS POST THEN ADD IT.
    if (requestData && (method === "POST" || method === "PUT"))
    {
        params.body = JSON.stringify (requestData);
    }

    // IF REQUEST DATA WAS PROVIDED METHOD IS GET THEN ADD IT.
    if (requestData && method === "GET")
    {
        endPoint += '?' + Object.keys (requestData)
        .map ((k) => (k + '=' + encodeURIComponent (requestData[k])))
        .join ('&');
    }

    // SEND DATA TO SERVER.
    let response = await fetch ("https://todo-test.digitaltolk.com/api" + endPoint, params);

    return response.json ();
}

export default httpRequest;