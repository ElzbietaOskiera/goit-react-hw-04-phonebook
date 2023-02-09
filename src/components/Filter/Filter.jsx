import PropTypes from 'prop-types';
import css from './Filter.module.css'

export const Filter = ({ value, onChange }) => {
  return (
    <div className={css.div}>
      <label className={css.label} htmlFor="filter">Find contacts by name</label>
      <input className={css.input}
        id="filter"
        name="filter"
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
