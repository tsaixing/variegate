import {Component} from "react";
import Nav from "../../components/nav";
import Filter from "../../components/filter";
import DetailCard from "../../components/detail-card";
import {getPlantKeyData, getPlantListData, getStatusMapData} from "../../lib/api";

export default class PlantListPage extends Component {
  render() {
    let {
      plantKeyData,
      plantListData,
      statusMapData
    } = this.props;

    return (
      <div>
        <Nav/>
        <Filter
          plantKeyData={plantKeyData}
          plantListData={plantListData}
          statusMapData={statusMapData}
        />

        <div className="container mx-auto py-10 px-8">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantListData
              .slice(0, plantListData.length)
              .map(({
                      sheetInvStatus,
                      plantId,
                      plantKey,
                      rootType,
                      listedPrice,
                      discountedPrice
                    }) => (
                <DetailCard
                  key={plantId}
                  cardImage={plantKeyData[plantKey].typeImage}
                  inventoryStatus={statusMapData[sheetInvStatus].siteInvStatus}
                  commonName={plantKeyData[plantKey].commonName}
                  latinName={plantKeyData[plantKey].latinName}
                  rootType={rootType}
                  listedPrice={listedPrice}
                  discountedPrice={discountedPrice}
                />
              ))
            }
          </div>
        </div>
      </div>
    );

    function searchPlants(listData, query) {
      return listData.filter(function (el) {
        return el.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
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
