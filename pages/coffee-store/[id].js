import { useRouter } from "next/router";
import Link from "next/link";

import coffeeStoresData from '../../data/coffee-stores.json'

export async function getStaticProps({staticProps}) {
  const params = staticProps.params;
  return{
    props:{
      coffeeStore:coffeeStoresData.find((coffeeStore)=> {
        return coffeeStore.id === params.id }),
    },
  }
}

export function getStaticPaths(){
  return{
    paths:[
      {params:{id: "0"}},
      {params:{id: "1"}},
      {params:{id:"2"}}
    ],
    fallback: false
  }
}


const CoffeeStore = (props) => {
  const router = useRouter();

  return (
    <div>
      coffee {router.query.id}
      <Link href="/">Back to home</Link>
    </div>
  )
}

export default CoffeeStore
