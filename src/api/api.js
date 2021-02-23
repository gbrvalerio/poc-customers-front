export const API_URL = 'http://localhost:8080';

export const login = async (username, password) => {
    return await apiRequest(
        'login', 
        {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
}

export const createCustomer = async (body, token) => {
    return await apiRequest(
        'customer', 
        {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

export const editCustomer = async (id, body, token) => {
    return await apiRequest(
        'customer/' + id, 
        {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

export const deleteCustomer = async (id, token) => {
    return await apiRequest(
        'customer/' + id, 
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

export const fetchCustomerById = async (id, token) => {
    return await apiRequest(
        'customer/' + id, 
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )
}

export const fetchAllCustomers = async (token) => {
    return await apiRequest(
        'customer/', 
        {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
    )
}


export const apiRequest = async (path, options) => {
    try {
        const response = await fetch(
            `${API_URL}/${path}`,
            options
        )
        try {
            return {
                status: response.status,
                data: await response.json()
            }
        } catch(err) {
            return { status: response.status, data: null }
        }
        
    } catch(error) {
        throw new Error('Servidor indisponível no momento. Tente novamente mais tarde.');
    }
}

export const API = {
    auth: {
        login
    },
    customer: {
        create: createCustomer,
        update: editCustomer,
        delete: deleteCustomer,
        getById: fetchCustomerById,
        getAll: fetchAllCustomers
    }
}