const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "8h",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer XXXXXX
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

const isAdmin=(req,res,next)=>{
  if(req,user&&req.user.isAdmin){
    next()
  }else{
    return res.status(401).send({message:"Not autholised"})
  }
}
const isAsUnderwritter=(req,res,next)=>{
  if(req,user&&req.user.isAsUnderwritter){
    next()
  }else{
    return res.status(401).send({message:"Not autholised"})
  }
}
const isUnderWriter=(req,res,next)=>{
  if(req,user&&req.user.isUnderWriter){
    next()
  }else{
    return res.status(401).send({message:"Not autholised"})
  }
}
const isSeniorUnderWriter=(req,res,next)=>{
  if(req,user&&req.user.isSeniorUnderWriter){
    next()
  }else{
    return res.status(401).send({message:"Not autholised"})
  }
}
const isHeadofMedical=(req,res,next)=>{
  if(req,user&&req.user.isHeadofMedical){
    next()
  }else{
    return res.status(401).send({message:"Not autholised"})
  }
}
const isOperationManager=(req,res,next)=>{
  if(req,user&&req.user.isOperationManager){
    next()
  }else{
    return res.status(401).send({message:"Not autholised"})
  }
}

module.exports = { isAuth,isUnderWriter, generateToken,isAdmin,isAsUnderwritter,isSeniorUnderWriter,isHeadofMedical,isOperationManager };
