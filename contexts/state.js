import {Component, createContext, useContext} from 'react';

const PlantFilterContext = createContext();

export class AppWrapper extends Component {
  render() {
    let {children} = this.props;
    let sharedState = {
      plantName: null,
      sheetInvStatus: null,
      rootType: null,
      minPrice: null,
      maxPrice: null
    };

    return (
      <PlantFilterContext.Provider value={sharedState}>
        {children}
      </PlantFilterContext.Provider>
    );
  }
}

export function useAppContext() {
  return useContext(PlantFilterContext);
}