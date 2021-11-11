import {useHttp} from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { heroAdded } from '../heroesList/heroesSlice';
import { selectAll } from '../heroesFilters/filtersSlice';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';
import store from '../../store'
const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    
    let temp = {id: '',
                name: '',
                description: '',
                element: null}
    const handleChange = (e) => {
        
        console.log(e.target["name"])
        switch(e.target["name"]){
            case 'name':
                temp.name = e.target.value;
                break;
            case 'text':
                temp.description = e.target.value;
                break;
            case 'element':
                temp.element = e.target.value;
                break;
            default:
                break;
        }
    }

    const addHero = (e) => {
        e.preventDefault();
        temp.id = uuidv4();
        e.target.reset();
        request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(temp))
            .then(dispatch(heroAdded(temp)))
        temp = {}
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({value, name}) => {
                // eslint-disable-next-line
                if (value === 'all')  return;

                return <option key={value} value={value}>{name}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={addHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    onChange={e => handleChange(e)}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    onChange={e => handleChange(e)}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    onChange={handleChange}
                    name="element">
                    <option >Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;