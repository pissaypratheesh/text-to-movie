import 'tailwindcss/tailwind.css';
import 'font-awesome/css/font-awesome.min.css';
import '../styles/globals.css'
import 'font-awesome/css/font-awesome.min.css';    

import 'react-18-image-lightbox/style.css'; // This only needs to be imported once in your app   
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
