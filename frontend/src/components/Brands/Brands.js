import './Brands.css'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, Route, useParams, useHistory } from 'react-router-dom';
import { thunkGetBrands, thunkDeleteBrands } from '../../store/brands.js'

const Brands = ({ brands, setBrands }) => {
    const dispatch = useDispatch();
    const { imageId } = useParams();
    const history = useHistory();
    // const [brands, setBrands] = useState([]);
    const brandsObj = useSelector(state => state.brands)

    useEffect(() => {
        dispatch(thunkGetBrands())
            .then(res => {
                let sortedBrands = res.sort((a,b) => a.id - b.id)
                // console.log("LINE 16 IN USE EFFECT", res)
                // let brandsArr = Object.values(brandsObj);
                // setBrands(brandsArr)
                setBrands(sortedBrands)
            })
    }, [dispatch])

    const user = useSelector(state => state.session.user)

    if (!brands.length) return <h1>no brands D:</h1>

    const handleDelete = (id) => {
        dispatch(thunkDeleteBrands(id))
            .then(() => {
                setBrands(brands.filter(brand => brand.id !== id))
            })
    }

    return (
        <div className='brands-page'>
            <p className='brands-text'>wearbnb, where everyone can post/book their favorite brands and look at their reviews!</p>
            <div className='brands-container'>
                {
                    brands?.map((brand) => (
                        <div
                            key={brand.id}
                            value={brand.id}
                        >
                            <div className='brands-card'>
                                <NavLink to={`brands/${brand.id}`}>
                                    <img className='brands-card-image' src={brand.brandImg}>
                                    </img>
                                </NavLink>
                                <div className='brands-card-footer'>
                                    {
                                        user?.id === brand.userId && (
                                            <button className='button' onClick={() => handleDelete(brand.id)}>Delete</button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Brands;
