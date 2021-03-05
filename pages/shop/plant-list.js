import {Component} from "react";
import Select from 'react-select'
import Nav from "../../components/nav";
import DetailCard from "../../components/detail-card"
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
        <div className="container mx-auto py-20 px-8">


          <Select
            isMulti
            name="plantName"
            placeholder="Search Plants"
            options={getPlantNameOptions()}
            className="inline-block m-2 w-80 rounded-full bg-white"
            classNamePrefix="select"
          />

          <Select
            isMulti
            name="siteStatus"
            placeholder="Status"
            options={getSiteStatusOptions()}
            className="inline-block m-2 w-80 rounded-full bg-white"
            classNamePrefix="select"
          />

          <Select
            isMulti
            name="siteStatus"
            placeholder="Root Type"
            options={getRootTypeOptions()}
            className="inline-block m-2 w-80 rounded-full bg-white"
            classNamePrefix="select"
          />

          <Select
            isMulti
            name="siteStatus"
            placeholder="Min Price"
            options={getSiteStatusOptions()}
            className="inline-block m-2 w-40 rounded-full bg-white"
            classNamePrefix="select"
          />

          <Select
            isMulti
            name="siteStatus"
            placeholder="Max Price"
            options={getSiteStatusOptions()}
            className="inline-block m-2 w-40 rounded-full bg-white"
            classNamePrefix="select"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plantListData
              .slice(0, plantListData.length)
              .map(({
                      stockStatus,
                      plantId,
                      plantKey,
                      rootType,
                      listedPrice,
                      discountedPrice
                    }) => (
                <DetailCard
                  key={plantId}
                  cardImage={plantKeyData[plantKey].typeImage}
                  stockStatus={statusMapData[stockStatus].siteStatus}
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

    function getPlantNameOptions() {
      const results = new Set();

      for (const plant of Object.values(plantListData)) {
        results.add(plant.plantKey);
      }

      return Array.from(results).map((plantKey) => ({
        value: plantKey,
        label: plantKeyData[plantKey].commonName + ", " + plantKeyData[plantKey].latinName
      }));
    }

    function getSiteStatusOptions() {
      const results = new Set();

      for (const status of Object.values(statusMapData)) {
        results.add(status.siteStatus);
      }

      return Array.from(results).map((status) => ({
        value: status,
        label: status
      }));
    }

    function getRootTypeOptions() {
      const results = new Set();

      for (const plant of Object.values(plantListData)) {
        results.add(plant.rootType);
      }

      return Array.from(results).map((rootType) => ({
        value: rootType,
        label: rootType
      }));
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
