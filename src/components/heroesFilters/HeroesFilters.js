import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, fetchFilters, selectAll } from './filtersSlice';
import store from '../../store'
import Spinner from '../spinner/Spinner';
const HeroesFilters = () => {
    const dispatch = useDispatch();
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState())
    console.log(filters)
    useEffect(() => {
        dispatch(fetchFilters());
    }, [])

    const setActiveFilter = (e) => {
        const filter = e.target["value"];
        dispatch(setFilter(filter));
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                {filtersLoadingStatus === 'loading' ? <Spinner/> : filtersLoadingStatus === 'error' ? <h5 className="text-center mt-5">Ошибка загрузки</h5> : null}
                <div className="btn-group">
                    {filters.map((el, i) => {
                        let classes;
                        switch (el.value) {
                            case 'wind':
                                classes = `btn-success`;
                                break;
                            case 'fire':
                                classes = 'btn-danger';
                                break;
                            case 'water':
                                classes = 'btn-primary';
                                break;
                            case 'earth':
                                classes = 'btn-secondary';
                                break;
                            default:
                                classes = 'btn-outline-dark';
                        }
                        return (
                            <button 
                                value={el.value} 
                                key={i} 
                                autoFocus={el.value === activeFilter}
                                className={`btn ${classes}${activeFilter === el.value ? " active" : ''}`}
                                onClick={setActiveFilter}>{el.name}</button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;