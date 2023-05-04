import { useEffect, useState } from "react";
import  useSWR  from "swr";


function useSwr(props) {
  const [salesData, setSalesData] = useState(props.sales);

  const { data, error} = useSWR("https://nextjs-courese-default-rtdb.firebaseio.com/sales.json")

  useEffect(() => {
   if(data){
    const transformData = [];

    for (const key in data) {
      transformData.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    setSalesData(transformData);
   }
  }, [data]);

  if (error) {
    return <p>Empty</p>;
  }

  if (!data && !salesData) {
    return <p>Yuklenir...</p>;
  }


  return (
    <ul>
      {salesData.map((item) => (
        <li key={item.id}>
          {item.username} - {item.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
 const response = await fetch("https://nextjs-courese-default-rtdb.firebaseio.com/sales.json")

 const data = await response.json()
    const transformData = [];

    for (const key in data) {
      transformData.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    
    return {
      props: {
        sales: transformData
      },
      revalidate: 10
    }
 
}

export default useSwr;
