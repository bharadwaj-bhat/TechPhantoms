export const swDev = ()=>{

    const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`
    navigator.serviceWorker.register(swUrl).then((resp)=>{
        console.log("res", resp)
    })

}