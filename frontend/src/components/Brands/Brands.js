import './Brands.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetBrands, thunkDeleteBrands } from '../../store/brands.js'

const Brands = () => {
    const dispatch = useDispatch();
    const { imageId } = useParams();
    const history = useHistory();
    const [brands, setBrands] = useState([]);
    const brandsObj = useSelector(state => state.brands)

    useEffect(() => {
        dispatch(thunkGetBrands())
            .then(res => {
                // console.log("LINE 16 IN USE EFFECT", res)
                // let brandsArr = Object.values(brandsObj);
                // setBrands(brandsArr)
                setBrands(res)
            })
    }, [dispatch])

    console.log("OUTSIDE OF USE EFFECT", brands)
    // if (!brands.length) return <h1>no brands D:</h1>

    const handleDelete = (id) => {
        dispatch(thunkDeleteBrands(id))
            .then(() => {
                setBrands(brands.filter(brand => brand.id !== id))
            })
    }

    return (
        <div className='brands-page'>
            <div className='brands-holder'>
                {
                    brands.map((brand) => (
                        <div
                            key={brand.id}
                            value={brand.id}
                        >
                            <div className='brands-container'>
                                <NavLink to={`brands/${brand.id}`}>
                                    <img src={brand.brandImg}>
                                    </img>
                                </NavLink>
                            </div>
                            <button className='button' onClick={() => handleDelete(brand.id)}>Delete</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Brands;
