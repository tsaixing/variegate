import {Component} from "react";
import Nav from "../../components/nav";
import DetailCard from "../../components/detail-card"
import {getPlantKeyData, getPlantListData, getStatusMapData} from "../../lib/api";

export default class ShopPage extends Component {
  render() {
    let {
      plantKeyData,
      plantListData,
      statusMapData
    } = this.props;

    const uniqueListedPlants = getUniqueListedPlants();
    const uniqueArrivingPlants = getUniqueArrivingPlants();

    return (
      <div>
        <Nav/>
        <div className="container mx-auto py-20 px-8">

          {/* NOW AVAILABLE */}

          <h2 className="font-bold mb-2">Now Available</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueListedPlants
              .map(({plantId, plantKey, sheetInvStatus}) => (
                <DetailCard
                  cardImage={plantKeyData[plantKey].typeImage}
                  inventoryStatus={statusMapData[sheetInvStatus].siteInvStatus}
                  commonName={plantKeyData[plantKey].commonName}
                  latinName={plantKeyData[plantKey].latinName}
                />
              ))
            }
          </div>

          {/* ARRIVING SOON */}

          <h2 className="font-bold mb-2">Arriving Soon</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueArrivingPlants
              .map(({plantId, plantKey, sheetInvStatus}) => (
                <DetailCard
                  cardImage={plantKeyData[plantKey].typeImage}
                  inventoryStatus={statusMapData[sheetInvStatus].siteInvStatus}
                  commonName={plantKeyData[plantKey].commonName}
                  latinName={plantKeyData[plantKey].latinName}
                />
              ))
            }
          </div>

        </div>
      </div>
    );

    function getUniqueListedPlants() {
      let uniqueListedPlants = new Set();

      return plantListData.filter(entry => {
        if (uniqueListedPlants.has(entry.plantKey)
          || statusMapData[entry.sheetInvStatus].siteInvStatus != "In Stock") {
          return false;
        }
        uniqueListedPlants.add(entry.plantKey);
        return true;
      });
    }

    function getUniqueArrivingPlants() {
      let uniqueArrivingPlants = new Set();

      return plantListData.filter(entry => {
        if (uniqueArrivingPlants.has(entry.plantKey)
          || statusMapData[entry.sheetInvStatus].siteInvStatus !== "Arriving Soon") {
          return false;
        }
        uniqueArrivingPlants.add(entry.plantKey);
        return true;
      });
    }

  }
}

export async function getStaticProps(context) {
  const plantKeyData = await getPlantKeyData();
  const plantListData = await getPlantListData();
  const statusMapData = await getStatusMapData();

  return {
    props: {
      plantKeyData,
      plantListData,
      statusMapData,
    },
    revalidate: 1,
  };
}
