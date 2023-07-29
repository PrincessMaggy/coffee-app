import {useRouter} from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css';
// import coffeeStoresData from '../../data/coffee-stores.json';
import cls from 'classnames';
import {getCommonStores} from '../../lib/stores';

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

const CoffeeStore = (props) => {
    // console.log(props.coffeeStore);
    const router = useRouter();
    // console.log(router.query.id);
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    const data = props.coffeeStore;

    const handleUpVoteButton = () => {};
    return (
        <div className={styles.layout}>
            <Head>
                <title>{data.name}</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.col1}>
                    <div className={styles.backToHomeLink}>
                        {' '}
                        <Link href='/'>{'<-- '}Back to home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{data.name}</h1>
                    </div>
                    <Image
                        src={
                            data.imageUrl
                                ? data.imageUrl
                                : '/static/coffee-store.jpg'
                        }
                        // src='/static/icons/nearMe.svg'
                        width={300}
                        height={180}
                        className={styles.storeImg}
                        alt={data.name}
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
                        <p className={styles.text}>{data.location}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/nearMe.svg'
                            width='24'
                            height='24'
                            alt='img'
                        />
                        <p className={styles.text}>{data.locality}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/nearMe.svg'
                            width='24'
                            alt='img'
                            height='24'
                        />
                        <p style={{paddingLeft: '0.5rem'}}>
                            {' '}
                            Categories: {data.categories}
                        </p>
                    </div>{' '}
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/star.svg'
                            width='24'
                            alt='img'
                            height='24'
                        />

                        <p className={styles.text}>1</p>
                    </div>
                    <button
                        className={styles.upvoteButton}
                        onClick={handleUpVoteButton}
                    >
                        Up vote !
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CoffeeStore;
