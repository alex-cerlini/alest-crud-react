import React from "react";

const SearchBar = () => {
  return (
    <div className="row col-md-10 offset-md-1">
      <form>
        <div className="input-group col-md-10">
          <div className="col-md-10 input-group">
            <i className="material-icons search-bar-icon form-control-lg">
              search
            </i>
            <input
              type="text"
              className="form-control-lg search-bar col-md-9"
            />
            <div className="col-md-2">
              <button className="btn btn-primary btn-block">Pesquisar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
