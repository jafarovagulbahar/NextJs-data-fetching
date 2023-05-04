import React from "react";
import path from "path";
import fs from "fs/promises";

function ProductDetailsPage(props) {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Yuklenirr...</p>;
  }
  return (
    <div>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </div>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.pid;

  const data = await getData();
  const product = data.products.find((p) => p.id === productId);

  if(!product){
    return { notFound: true}
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: [{ params: pathWithParams}],
    fallback: false,
  };
}

export default ProductDetailsPage;
