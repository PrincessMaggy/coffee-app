import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css"
import coffeeStoresData from '../../data/coffee-stores.json'
import cls from 'classnames'

 
export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log("params", params)
  return{
    props:{
      coffeeStore:coffeeStoresData.find((coffeeStore)=> {
        return coffeeStore.id.toString() === params.id }),
    },
  }
}

export function getStaticPaths(){
  const paths = coffeeStoresData.map(coffeeStore=>{
    return{
      params:{
        id:coffeeStore.id.toString()
      }
    }
  })
  return{
    paths,
    fallback: true
  }
}


const CoffeeStore = (props) => {
  const router = useRouter();

  if(router.isFallback){
    return <div>Loading...</div>
  }
  const {address, name, neighbourhood, imgUrl} = props.coffeeStore

  const handleUpVoteButton =()=>{

  }
  return (
    <div className={styles.layout}>
    <Head>
      <title>{name}</title>
    </Head>

<div className={styles.container}>
  <div className={styles.col1}>
      <div className={styles.backToHomeLink}>      <Link href="/">Back to home</Link>
</div>
  <div className={styles.nameWrapper}>
  <h1 className={styles.name}>{name}</h1>

  </div>
      <Image src={imgUrl} width={600} height={360} className={styles.storeImg} alt={name}></Image>
    </div>

    <div className={cls("glass",styles.col2)}>
    <div className={styles.iconWrapper}>
      <Image src="/static/icons/places.svg" width="24" height="24"/>
      <p className={styles.text}>{address}</p>
    </div>
    
    <div className={styles.iconWrapper}>
      <Image src="/static/icons/nearMe.svg" width="24" height="24"/>
      <p className={styles.text}>{neighbourhood}</p>
    </div>

    <div className={styles.iconWrapper}>
      <Image src="/static/icons/star.svg" width="24" height="24"/>
      <p>{address}</p>
    </div>
      <p className={styles.text}>1</p>
      <button className={styles.upvoteButton} onClick={handleUpVoteButton}>Up vote</button>

    </div>

</div>

    </div>
  )
}

export default CoffeeStore
