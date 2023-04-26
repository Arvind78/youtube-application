const error =(status,massage)=>{
    const err = new Error();
    err.status=status,
    err.massage=massage
    return err
}
module.exports=error;






