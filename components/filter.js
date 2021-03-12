import {Component} from "react";
import FilterBlock from "./filter-block";

export default class Filter extends Component {
  render() {
    let {
      plantKeyData,
      plantListData,
      statusMapData
    } = this.props;

    return (
      <div className="container mx-auto px-8">

        <FilterBlock
          type="multiselect"
          filterLabel="Plant Name"
          name="plantName"
          options={getPlantNameOptions()}
          ariaLabel="Search By Plant Name"
        />

        <FilterBlock
          type="multiselect"
          filterLabel="Inventory Status"
          name="siteInvStatus"
          ariaLabel="Search By Inventory Status"
          options={getSiteInvStatusOptions()}
        />

        <FilterBlock
          type="multiselect"
          filterLabel="Root Type"
          name="rootType"
          ariaLabel="Search By Root Type"
          options={getRootTypeOptions()}
          className="inline-block m-2 w-80 rounded-full bg-white"
        />

        <FilterBlock
          filterLabel="Min Price"
          name="minPrice"
          ariaLabel="Filter By Min Price"
          options={getSiteInvStatusOptions()}
          className="inline-block m-2 w-40 rounded-full bg-white"
        />

        <FilterBlock
          filterLabel="Max Price"
          name="maxPrice"
          ariaLabel="Filter By Max Price"
          options={getSiteInvStatusOptions()}
          style="inline-block m-2 w-40 rounded-full bg-white"
        />

      </div>
    );

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

    function getSiteInvStatusOptions() {
      const results = new Set();

      for (const status of Object.values(statusMapData)) {
        results.add(status.siteInvStatus);
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