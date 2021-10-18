export const GetData = (key) => {
    const data = JSON.parse
        (localStorage.getItem(key))
    return data
}
export const SetData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}
