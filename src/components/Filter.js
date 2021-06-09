/* eslint react/prop-types: 0 */
import React from 'react';

function Filter(props) {
  const [value, setValue] = React.useState(props.value);

  React.useEffect(() => {
    if (props.reset) {
      setValue(props.value);
    }
  }, [props.reset, props.value]);

  function changeValue(event) {
    props.setReset(false);
    const selector = event.target;
    setValue(event.target.value);
    props.changeFilter(selector);
  }

  return (
    <label className="filter__label">
      {props.name}
      <input
        className="filter__range"
        onChange={changeValue}
        name={props.name}
        data-sizing={props.size}
        type="range"
        min={props.min}
        max={props.max}
        value={value}
      />
      <output className="filter__output" name="result">
        {props.value}
      </output>
    </label>
  );
}

export default Filter;
