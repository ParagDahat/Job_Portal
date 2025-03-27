// used for custom errors
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}


// this is a middleware..used for handling errors..if error occurs in any route then this middleware will handle that error and send the response to the client
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CaseError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `json web token is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `json web token is expired, Try again`;
    err = new ErrorHandler(message, 400);
  }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default ErrorHandler;

// class Human{

//     age = 25;
//     ht = 5;
//     wt = 60;
//     constructor(name){
//         this.name = name;
//     }
//     speak(){
//         console.log("I am speaking")
//         }
// }

// let obj1 = new Human("parag");

// class Fruit{
//     shape :
//     color :
//     taste
// }
// class pineapple extends Fruit{
//    kaate : true;
// }
