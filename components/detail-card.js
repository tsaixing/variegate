import {Component} from "react";
import Link from "next/link";

export default class DetailCard extends Component {
  render() {
    let {
      plantId,
      plantKey,

      cardImage,
      inventoryStatus,
      commonName,
      latinName,
      rootType,
      startingAtPrice,
      listedPrice,
      discountedPrice
    } = this.props;

    const cardBg = "url(" + cardImage + ")";
    const pillBaseStyle = "ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full";
    const pillColor = pillBaseStyle + " " + getPillColor(inventoryStatus);
    const startingAtText = startingAtPrice ? "Starting At" : "";
    const listedPriceText = discountedPrice
    && listedPrice
    && discountedPrice != listedPrice
      ? listedPrice
      : "";

    return (
      <Link key={plantId}
            href={{
              pathname: '/shop/plant-list',
              query: {
                plantKey: plantKey,
                inventoryStatus: inventoryStatus,
              },
            }}>
        <div className="w-full max-w-sm overflow-hidden rounded border bg-white shadow
          hover:shadow-2xl cursor-pointer
          transition duration-500 ease-in-out">

          <div className="relative">
            <div className="h-48 bg-cover bg-no-repeat bg-center"
                 style={{backgroundImage: cardBg}}>
            </div>
          </div>

          <div className="flex justify-between p-3">
            <div>
              <div className="text-md font-medium text-gray-900">
                {commonName}
                <span className={pillColor}>
              {inventoryStatus}
            </span>
              </div>
              <div className="text-sm text-gray-400">
                {latinName}
              </div>
              <div className="mt-1 text-xs text-gray-400 font-semibold">
                {rootType}
              </div>
            </div>

            <div className="justify-self-end text-lg font-semibold">
              <span className="text-gray-500">{discountedPrice}</span>
              <span className="ml-2 text-gray-400">
            <del>{listedPriceText}</del>
          </span>

              {/*<span className="align-text-top text-md text-red-300 font-semibold">*/}
              {/*  {startingAtText} {startingAtPrice}*/}
              {/*</span>*/}
            </div>
          </div>

        </div>
      </Link>
    );

    function getPillColor(inventoryStatus) {
      switch (inventoryStatus) {
        case "Arriving Soon":
          return " bg-blue-100 text-blue-800";
          break;
        case "In Stock":
          return " bg-green-100 text-green-800";
          break;
        case "Pending":
          return " bg-purple-100 text-purple-800";
          break;
        case "Sold":
          return " bg-pink-100 text-pink-800";
          break;
      }
    }

  }
}

export async function getStaticProps(context) {
  return {
    props: {
      plantId,
      plantKey,

      cardImage,
      inventoryStatus,

      commonName,
      latinName,

      startingAtPrice,
      listedPrice,
      discountedPrice,
    },
    revalidate: 1,
  };
}
