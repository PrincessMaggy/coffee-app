import Head from 'next/head'

//import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import Banner from '../components/banner'
import Image from 'next/image'
import Card from '../components/card'

import coffeeStores from '../data/coffee-stores.json'

export async function getStaticProps(context) {
  return{
    props:{
      coffeeStores,
    },
  }
}

//const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {

  const bannerBtnClick =()=>{

  }

  return (
    <div className='styles.container'>
      <Head>
        <title>Coffee-app</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
       
    <Banner 
        buttonText="View stores nearby" 
        onBannerBtnClick={bannerBtnClick}
    />
    <div className={styles.heroImage}>
        <Image 
        src="/static/hero-image.png" 
        width={700} height={400} />
    </div>

    <div className={styles.cardLayout}>
      {coffeeStores.map((coffeeStore) =>{
        return(
          <Card 
            name={coffeeStore.name}
            href={`/coffee-store/${coffeeStore.id}`}
            imgUrl={coffeeStore.imgUrl}
            className={styles.card} 
            key={coffeeStore.id}
            />
        )
      })}
       
    </div>
        
      </main>
      
    </div>
  )
}
