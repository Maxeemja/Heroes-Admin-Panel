import {useHttp} from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { heroesFetching, heroAdded, heroesFetchingError} from '../../actions';
import { v4 as uuidv4 } from 'uuid';
import { useSelector } from 'react-redux';

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const { filters } = useSelector(state => state.filters);
    let temp = {id: '',
                name: '',
                description: '',
                element: null}

    const handleChange = (e) => {
        switch(e.target["name"]){
            case 'name':
                temp.name = e.target.value;
                break;
            case 'text':
                temp.description = e.target.value;
                break;
            case 'element':
                temp.element = e.target.value;
                break
            default:
                break;
        }
    }

    const addHero = (e) => {
        e.preventDefault();
        temp.id = uuidv4();
        e.target.reset();
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(temp))
            .then(dispatch(heroAdded(temp)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={addHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                    {filters.map((el, i) => el.value !== 'all' ? <option key={i} value={el.value}>{el.name}</option> : null)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;