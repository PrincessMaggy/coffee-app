import StoreProvider from '../context/storeContext';
import '../styles/globals.css';

export default function App({Component, pageProps}) {
    return (
        <StoreProvider>
            <Component {...pageProps} />{' '}
        </StoreProvider>
    );
}
