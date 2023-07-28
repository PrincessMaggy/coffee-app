import {useRouter} from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/coffee-store.module.css';
import coffeeStoresData from '../../data/coffee-stores.json';
import cls from 'classnames';

export async function getStaticProps(staticProps) {
    const params = staticProps.params;
    console.log('params', params.id);
    let filt = [];
    filt.push(
        coffeeStoresData.find((coffeeStore) => {
            return coffeeStore.fsq_id == params.id;
        }),
    );
    console.log(filt);
    return {
        props: {
            coffeeStore: filt.map((item) => {
                const imageUrl =
                    item.categories[0]?.icon?.prefix +
                    '32' +
                    item.categories[0]?.icon?.suffix;

                return {
                    imageUrl,
                    name: item.name,
                    fsq_id: item.fsq_id,
                    location: item.location.formatted_address,
                    locality: item.location.locality,
                    categories: item.categories
                        .map((item) => item.name)
                        .join(', '),
                };
            }),
        },
    };
}

export function getStaticPaths() {
    const paths = coffeeStoresData.map((coffeeStore) => {
        return {
            params: {
                id: coffeeStore.fsq_id,
            },
        };
    });
    return {
        paths,
        fallback: false,
    };
}

const CoffeeStore = (props) => {
    console.log(props.coffeeStore[0]);
    const router = useRouter();
    console.log(router.query.id);
    if (router.isFallback) {
        return <div>Loading...</div>;
    }
    const data = props.coffeeStore[0];

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
                        <Link href='/'>Back to home</Link>
                    </div>
                    <div className={styles.nameWrapper}>
                        <h1 className={styles.name}>{data.name}</h1>
                    </div>
                    <Image
                        src={data.imageUrl}
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
                        />
                        <p className={styles.text}>{data.location}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/nearMe.svg'
                            width='24'
                            height='24'
                        />
                        <p className={styles.text}>{data.locality}</p>
                    </div>
                    <div className={styles.iconWrapper}>
                        <Image
                            src='/static/icons/nearMe.svg'
                            width='24'
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
