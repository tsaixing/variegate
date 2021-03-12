import {Component} from "react";
import MultiSelect from "react-multi-select-component";

export default class FilterBlock extends Component {
  render() {
    let {
      filterLabel,
      type,
      name,
      options,
      ariaLabel,
    } = this.props;

    //TODO: https://medium.com/@compmonk/react-multi-select-with-check-boxes-and-select-all-option-bd16941538f3

    return (
      <div className="inline-block mr-2">

        <div className="block m-0 font-semibold text-sm text-gray-800 uppercase">{filterLabel}</div>

        {type != "multiselect" ? null :
          <MultiSelect
            name={name}
            options={options}
            className="inline-block w-80 rounded-full bg-white"
            labelledBy={ariaLabel}
          />
        }

        {type != "number" ? null :
          <input
            type="number"
            name={name}
            options={options}
            className="inline-block w-20 rounded bg-white border-gray-300 border p-1.5"
            aria-label={ariaLabel}
          />
        }

      </div>

    );
  }
}