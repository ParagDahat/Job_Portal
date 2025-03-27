import app from './app.js';
import cloudinary from 'cloudinary';

const PORT = process.env.PORT;

cloudinary.v2.config({
  cloud_name: process.env.ClOUDINARY_CLIENT_NAME,
  api_key:process.env.ClOUDINARY_CLIENT_API,
  api_secret:process.env.ClOUDINARY_CLIENT_SECRET,
})


app.listen(PORT, (error) => {
  if (error) {
    console.error(`Failed to start server: ${error.message}`);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});

