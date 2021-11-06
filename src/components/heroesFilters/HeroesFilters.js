import {useEffect} from 'react';
import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { filtersFetch, setFilter } from '../../actions';
import Spinner from '../spinner/Spinner';
const HeroesFilters = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();
    const { filters , filtersLoadingStatus , activeFilter } = useSelector(state => state.filters);

    useEffect(() => {
        dispatch(filtersFetch(request));
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
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом