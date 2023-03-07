const allowedOrigin = [
    "https://fiverrclone-v2.onrender.com"
]

const corsOptions = {
   origin : (origin, callback) => {
    if(allowedOrigin.indexOf(origin) !== -1 || !origin){
        callback(null, true);
    }else{
        callback(new Error("Blocked by the CORS origin policy"))
    }
   },
   credentials : true,
   optionSuccessStatus : 200
}

export default corsOptions;