import {useRouter} from 'next/router';
import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css';
// import coffeeStoresData from '../../data/coffee-stores.json';
import cls from 'classnames';
import {getCommonStores} from '../../lib/stores';
import {StoreContext} from '../../context/storeContext';
import {fetcher, isEmpty} from '../../utils';
import useSWR from 'swr';

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    // console.log('params', params.id);

    const coffeeStores = await getCommonStores();
    const findStoreById = coffeeStores.find((coffeeStore) => {
        return coffeeStore.id == params.id;
    });
    return {
        props: {
            coffeeStore: findStoreById ? findStoreById : {},
        },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await getCommonStores();

    const paths = coffeeStores.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.id,
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
}

const CoffeeStore = (initialProps) => {
    const router = useRouter();
    const {useEffect, useState, useContext} = React;
    const [coffeeStore, setCoffeeStore] = useState(
        initialProps.coffeeStore || {},
    );
    const {
        state: {coffeeStores},
    } = useContext(StoreContext);
    const id = router.query.id;

    const handleCreateCoffeeStore = async (coffeeStore) => {
        try {
            const {id, name, imageUrl, location, locality, categories} =
                coffeeStore;
            const response = await fetch('/api/createCoffeeStore', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting: 0,
                    locality,
                    imageUrl,
                    location,
                    categories,
                }),
            });

            const dbCoffeeStore = await response.json();
            console.log(dbCoffeeStore, 'dbCoffeeStore');
        } catch (err) {
            console.error('Error creating coffee store', err);
        }
    };

    useEffect(() => {
        if (isEmpty(initialProps.coffeeStore)) {
            if (coffeeStores?.length > 0) {
                const findCoffeeStoreById = coffeeStores.find((coffeeStore) => {
                    return coffeeStore.id.toString() === id; //dynamic id
                });
                setCoffeeStore(findCoffeeStoreById);
                handleCreateCoffeeStore(findCoffeeStoreById);
            }
        } else {
            // SSG
            handleCreateCoffeeStore(initialProps.coffeeStore);
        }
    }, [id, initialProps.coffeeStore, coffeeStores]);

    const {
        name = '',
        categories = '',
        location = '',
        imageUrl = '',
        locality = '',
    } = coffeeStore;

    const [votingCount, setVotingCount] = useState(0);

    // const {data, error} = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);
    // useEffect(() => {
    //     if (data && data.length > 0) {
    //         setCoffeeStore(data[0]);
    //         setVotingCount(data[0].voting);
    //     }
    // }, [data]);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const handleUpvoteButton = async () => {
        //     try {
        //         const response = await fetch('/api/favouriteCoffeeStoreById', {
        //             method: 'PUT',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify({
        //                 id,
        //             }),
        //         });
        //         const dbCoffeeStore = await response.json();
        //         if (dbCoffeeStore && dbCoffeeStore.length > 0) {
        //             let count = votingCount + 1;
        //             setVotingCount(count);
        //         }
        //     } catch (err) {
        //         console.error('Error upvoting the coffee store.', err);
        //     }
    };

    // if (error) {
    //     console.log(error, 'error');
    //     return (
    //         <div>
    //             Something went wrong with retrieving the coffee store page.
    //         </div>
    //     );
    // }

    return (
        <div className={styles.layout}>
            <Head>
                <title>{name}</title>
                <meta name='description' content={`${name} coffee store`} />
            </Head>

            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        <Link href='/'>← Back to home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{name}</h1>
                    </div>
                    <Image
                        src={imageUrl ? imageUrl : '/static/coffee-store.jpg'}
                        // src='/static/icons/nearMe.svg'
                        width={300}
                        height={180}
                        className={styles.storeImg}
                        alt={name}
                    ></Image>
                </div>

                <div className={cls('glass', styles.col2)}>
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/places.svg'
                            width='24'
                            height='24'
                            alt='img'
                        />
                        <p className={styles.text}>{location}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/nearMe.svg'
                            width='24'
                            height='24'
                            alt='img'
                        />
                        <p className={styles.text}>{locality}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/nearMe.svg'
                            width='24'
                            alt='img'
                            height='24'
                        />
                        <p style={{paddingLeft: '0.5rem'}}>
                            Categories: {categories}
                        </p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/star.svg'
                            width='24'
                            alt='img'
                            height='24'
                        />

                        <p className={styles.text}>{votingCount}</p>
                    </div>
                    <button
                        className={styles.upvoteButton}
                        onClick={handleUpvoteButton}
                    >
                        Up vote !
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStore;
