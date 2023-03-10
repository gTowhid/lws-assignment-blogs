import { useDispatch, useSelector } from 'react-redux';
import { filterSelected, sortSelected } from '../features/filter/filterSlice';

export default function Sidebar() {
  const dispatch = useDispatch();
  const { filter, sort } = useSelector((state) => state.filter);

  const handleSortChange = (e) => {
    e.preventDefault();
    dispatch(sortSelected(e.target.value));
  };

  return (
    <aside>
      <div className="sidebar-items">
        <div className="sidebar-content">
          <h4>Sort</h4>

          <select
            name="sort"
            id="lws-sort"
            className="w-full max-w-[150px] border-2 rounded-md text-gray-500"
            onChange={(e) => handleSortChange(e)}
          >
            <option value="" selected={sort === '' ? 'selected' : ''}>
              Default
            </option>
            <option
              value="newest"
              selected={sort === 'newest' ? 'selected' : ''}
            >
              Newest
            </option>
            <option
              value="most_liked"
              selected={sort === 'most_liked' ? 'selected' : ''}
            >
              Most Liked
            </option>
          </select>
        </div>
        <div className="sidebar-content">
          <h4>Filter</h4>
          <div className="radio-group">
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-all"
                className="radio"
                defaultChecked={filter === 'lws-all' ? true : false}
                onChange={(e) => dispatch(filterSelected(e.target.id))}
              />
              <label for="lws-all">All</label>
            </div>
            <div>
              <input
                type="radio"
                name="filter"
                id="lws-saved"
                className="radio"
                defaultChecked={filter === 'lws-saved' ? true : false}
                onChange={(e) => dispatch(filterSelected(e.target.id))}
              />
              <label for="lws-saved">Saved</label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
