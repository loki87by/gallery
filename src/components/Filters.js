/* eslint react/prop-types: 0 */
import React from 'react';
import Filter from './Filter';
import { FILTERS_DATA } from '../utils/consts';

function Filters(props) {
  const [filter, setFilter] = React.useState({});
  const [reset, setReset] = React.useState(false);

  function getFilter(selector) {
    const filters = JSON.parse(JSON.stringify(filter));
    filters[selector.name] = `${selector.value}${selector.sizing}`;
    setFilter(filters);
    props.setImgFilter(filters);
  }
  function changeFilter(selector) {
    selector.nextElementSibling.textContent = selector.value;
    const filterData = {
      name: selector.name,
      value: selector.value,
      sizing: selector.dataset.sizing,
    };
    getFilter(filterData);
  }

  function resetFilters() {
    props.setImgFilter({});
    setFilter({});
    setReset(true);
    const outputs = document.querySelectorAll('output');
    for (let i = 0; i < outputs.length; i++) {
      outputs[i].value = FILTERS_DATA[i].value;
    }
  }

  function download() {
    const filters = JSON.parse(JSON.stringify(filter));
    let filtersString = Object.entries(filters)
      .map((item) => {
        return item.join('(');
      })
      .flat()
      .join(') ');
    if (filtersString !== '') {
      filtersString = filtersString.concat(')');
    }
    const canvas = document.createElement('canvas');
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = props.source;
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext('2d');
      ctx.filter = filtersString;
      ctx.drawImage(img, 0, 0);
    };
    setTimeout(() => {
      let link = document.createElement('a');
      link.download = `download.png`;
      link.href = canvas.toDataURL(`image/png`);
      link.click();
      link.remove();
    }, 1000);
  }

  return (
    <section className="filters">
      {FILTERS_DATA.map((data, index) => (
        <Filter
          key={index}
          name={data.name}
          size={data.size}
          min={data.min}
          max={data.max}
          value={data.value}
          reset={reset}
          changeFilter={changeFilter}
          setReset={setReset}
        />
      ))}
      <button className="filters__btn" onClick={resetFilters}>
        Reset
      </button>
      <button className="filters__btn filters__btn_download" onClick={download}>
        Download
      </button>
    </section>
  );
}

export default Filters;
