export const getAllCountry = async (data) => {
    const response = await fetch('https://task-devel.cleevio-vercel.vercel.app/api/country')
    if (!response.ok) {
        throw new Error("Something went wrong")
    }
    return response.json()
}



export const createtrip = async (data) => {
    const response = await fetch('https://task-devel.cleevio-vercel.vercel.app/api/trip',
    {
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
        })
    if (!response.ok) {
        throw new Error(response.json().message)
    }
    return response.json()
}