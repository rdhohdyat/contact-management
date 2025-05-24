export const addressCreate = async (token, id, {
    street, city, province, country, postal_code
}) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json',
            "Authorization": token
        },
        body: JSON.stringify({
            street,
            city,
            province,
            country, postal_code
        })
    })
}

export const addressList = async (token, id) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    })
}

export const addressDetail = async (token, id, id_address) => {
    return await fetch(`${import.meta.env.VITE_API_PATH}/contacts/${id}/addresses/${id_address}`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': token
        }
    })
}