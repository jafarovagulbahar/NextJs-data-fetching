import { useEffect, useState } from "react";

// Client side rendering fetch example

function LastSalasPage(props) {
  const [salesData, setSalesData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-courese-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformData = [];

        for (const key in data) {
          transformData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSalesData(transformData);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Yuklenir...</p>;
  }

  if (!salesData) {
    return <p>Empty</p>;
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

export default LastSalasPage;
