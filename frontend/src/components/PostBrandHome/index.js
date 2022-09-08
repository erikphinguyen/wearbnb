import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkPostBrands } from '../../store/brands';

function PostBrand({ brands, setBrands, onClose, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [brandImg, setBrandImg] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [errors, setErrors] = useState([])

    const reset = () => {
        setBrandImg('');
        setName('');
        setAddress('');
        setCity('');
        setCountry('');
    }

    const selectUser = useSelector(state => {
        return state.session.user
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newBrand = {
            fromModal: true,
            userId: selectUser.id,
            brandImg,
            name,
            address,
            city,
            country
        }

        // const brand = await dispatch(thunkPostBrands(newBrand));
        // if validation erros = empty, dispatch
        dispatch(thunkPostBrands(newBrand))
            .then(res => {
                if (res.error) {
                    setErrors(res.error)
                    return
                }
                // onClose();
                setShowModal(false);
                setBrands([...brands, res])
                // history.push({pathname:`/brands/${String(res.id)}`, state:{data: res}})
            })
        // if (brand) {
        //     // reset();
        //     // history.push(`/brands/${brand.id}`)
        //     history.push({pathname:`/brands/${brand.id}`, state:{data: brand}})
        // }
    };


    return (
        <div>
            <ul>
                {errors.map((error, idx) => (
                    <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                ))}
            </ul>
            <h2 className='input'>Upload New Brand</h2>
            <form className="form" onSubmit={handleSubmit}>
                <input
                    className='input'
                    style={errors.length && brandImg.length == 0 ? { border: "1px solid red" } : null}
                    type='text'
                    onChange={(event) => setBrandImg(event.target.value)}
                    value={brandImg}
                    placeholder='Brand Image'
                    name='brandImg'
                />
                <input
                    className='input'
                    style={errors.length && brandImg.length == 0 ? { border: "1px solid red" } : null}
                    type='text'
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    placeholder='Name'
                    name='name'
                />
                <input
                    className='input'
                    style={errors.length && brandImg.length == 0 ? { border: "1px solid red" } : null}
                    type='text'
                    onChange={(event) => setAddress(event.target.value)}
                    value={address}
                    placeholder='Address'
                    name='address'
                />
                <input
                    className='input'
                    style={errors.length && brandImg.length == 0 ? { border: "1px solid red" } : null}
                    type='text'
                    onChange={(event) => setCity(event.target.value)}
                    value={city}
                    placeholder='City'
                    name='city'
                />
                <input
                    className='input'
                    style={errors.length && brandImg.length == 0 ? { border: "1px solid red" } : null}
                    type='text'
                    onChange={(event) => setCountry(event.target.value)}
                    value={country}
                    placeholder='Country'
                    name='country'
                />
                <button className='button' type='submit' >Submit</button>
            </form>
        </div>
    );
}

export default PostBrand
