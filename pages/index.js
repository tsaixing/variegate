import Nav from "../components/nav";
import { getSheetData } from "../lib/api";

export default function IndexPage({ content }) {
  return (
    <div>
      <Nav />
      <div className="container mx-auto py-20 px-8">
        <h1 className="text-5xl text-center text-accent-1 mb-16">
          Index
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content
            .slice(0, content.length - 1)
            .map(({ plantName, quantityAvailable, startingAtPrice }) => (
              <a
                className="border border-grey-200 rounded p-4 hover:shadow-lg hover:border-transparent"
                key={plantName}
                href={plantName}
                target="_blank"
              >
                <h3 className="font-bold mb-2">{plantName}</h3>
                <div dangerouslySetInnerHTML={{ __html: startingAtPrice }} />
                <span className="text-blue-600 hover:text-blue-400 hover:underline mt-4 block">
                  Documentation →
                </span>
              </a>
            ))}
        </div>
        <div className="text-center mt-8">
          {content
            .slice(content.length - 1)
            .map(({ plantName, startingAtPrice }) => (
              <div className="markdown inline-p">
                <strong>{plantName}</strong>{" "}
                <span dangerouslySetInnerHTML={{ __html: startingAtPrice }} />
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  // const content = await getSheetData();

  return {
    props: {
      // content,
    },
    revalidate: 1,
  };
}
