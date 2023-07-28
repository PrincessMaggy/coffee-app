import Head from 'next/head';
import {useState, useEffect} from 'react';
import styles from '../styles/Home.module.css';
import Banner from '../components/banner';
import Image from 'next/image';
import Card from '../components/card';
import Spinner from '../components/spinner';

import {getCommonStores} from '../lib/stores';
import useTrackLocation from '../hooks/useTrackLocation';

export async function getServerSideProps() {
    try {
        const coffeeStores = await getCommonStores();
        console.log(coffeeStores); // Log the coffeeStores data to the console

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
    // loading component
    // let [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     if (coffeeStores.length > 0) {
    //         setLoading(false);
    //     }
    // }, [coffeeStores]);

    // getting user's location
    const {handleTrackLocation, latLong, locationErrorMsg, loading} =
        useTrackLocation();

    console.log({latLong, locationErrorMsg});
    const bannerBtnClick = () => {
        handleTrackLocation();
    };

    return (
        <div className='styles.container'>
            {/* <Spinner loading={loading} /> */}

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
                        loading ? 'Locating store...' : 'View stores nearby'
                    }
                    onBannerBtnClick={bannerBtnClick}
                />
                {locationErrorMsg && (
                    <p> Something went wrong: {locationErrorMsg}</p>
                )}
                <div className={styles.heroImage}>
                    <Image
                        src='/static/hero-image.png'
                        width={700}
                        height={400}
                        alt='hero'
                    />
                </div>
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
