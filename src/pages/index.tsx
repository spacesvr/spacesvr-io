import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const Scene = dynamic(import("Scene"), { ssr: false });

const IndexPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spaces Gallery</title>
      </Head>
      <Scene />
    </>
  );
};

export default IndexPage;
