import Head from 'next/head';
import {useState, useEffect, useContext} from 'react';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Image from 'next/image';
import {ACTION_TYPES, StoreContext} from '../context/storeContext';
import Card from '../components/card';

import {getCommonStores} from '../lib/stores';
import useTrackLocation from '../hooks/useTrackLocation';

export async function getServerSideProps() {
    try {
        const coffeeStores = await getCommonStores();
        // console.log(coffeeStores); // Log the coffeeStores data to the console

        return {
            props: {
                coffeeStores,
            },
        };
    } catch (error) {
        console.error('Error fetching common stores:', error);

        return {
            props: {
                coffeeStores: [],
            },
        };
    }
}

export default function Home({coffeeStores}) {
    // getting user's location
    const {handleTrackLocation, locationErrorMsg, loading} = useTrackLocation();
    const [err, setErr] = useState(null);

    const {dispatch, state} = useContext(StoreContext);
    const {nearCoffeeStores, latLong} = state;
    console.log(nearCoffeeStores, latLong);

    useEffect(() => {
        const fetchData = async () => {
            if (latLong) {
                try {
                    const fetchedCoffeeStores = await getCommonStores(latLong);
                    dispatch({
                        type: ACTION_TYPES.SET_NEAR_COFFEE_STORES,
                        payload: {
                            nearCoffeeStores: fetchedCoffeeStores,
                        },
                    });
                    // set coffee stores
                } catch (error) {
                    // set error
                    console.log({error: error});
                    setErr(error.message);
                }
            }
        };
        fetchData();
    }, [latLong]);
    // console.log({latLong, locationErrorMsg});
    const bannerBtnClick = () => {
        handleTrackLocation();
    };

    return (
        <div className='styles.container'>
            <Head>
                <title>Coffee-app</title>
                <meta
                    name='description'
                    description='Discover coffee stores around you...'
                    content='Generated by create next app'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link rel='icon' href='/favicon.ico' />
                <title>Coffee Store</title>
            </Head>
            <main className={styles.main}>
                <Banner
                    buttonText={
                        loading ? 'Locating stores...' : 'View stores nearby'
                    }
                    onBannerBtnClick={bannerBtnClick}
                />
                {locationErrorMsg && (
                    <p> Something went wrong: {locationErrorMsg}</p>
                )}
                {err && <p> Something went wrong: {err}</p>}
                <div className={styles.heroImage}>
                    <Image
                        src='/static/hero-image.png'
                        width={700}
                        height={400}
                        alt='hero'
                    />
                </div>

                {nearCoffeeStores?.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Stores near me</h2>
                        <div className={styles.cardLayout}>
                            {nearCoffeeStores.map((coffeeStore) => {
                                return (
                                    <Card
                                        name={coffeeStore.name}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                        key={coffeeStore.id}
                                        imgUrl={coffeeStore.imageUrl}
                                        className={styles.card}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
                {coffeeStores.length > 0 && (
                    <div className={styles.sectionWrapper}>
                        <h2 className={styles.heading2}>Chicago Stores</h2>
                        <div className={styles.cardLayout}>
                            {coffeeStores.map((coffeeStore) => {
                                return (
                                    <Card
                                        name={coffeeStore.name}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                        key={coffeeStore.id}
                                        imgUrl={coffeeStore.imageUrl}
                                        className={styles.card}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
