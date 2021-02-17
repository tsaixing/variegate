import Nav from "../components/nav";
// import { getSheetData } from "../lib/api";

export default function AboutPage({ content }) {
  return (
    <div>
      <Nav />
      <div className="container mx-auto py-20 px-8">
        <h1 className="text-5xl text-center text-accent-1 mb-16">
          About
        </h1>

      </div>
    </div>
  );
}

export async function getStaticProps(context) {

  return {
    props: {
      // content,
    },
    revalidate: 1,
  };
}
