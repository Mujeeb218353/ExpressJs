const errorHandler = (err, req, res, next) => {
    if(err.status){
        res.status(err.status).json({ msg: err.message, status: "fail" });
    }else{
        res.status(500).json({ msg: err.message, status: "fail" });
    }
}

export default errorHandler;
