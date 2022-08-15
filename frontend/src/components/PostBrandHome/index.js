import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkPostBrands } from '../../store/brands';

function PostBrand({ brands, setBrands, onClose, setShowModal }) {
    console.log('HITING POST BRAND MODAL', brands)
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

    // console.log('DOES BRANDS POP UP', brands)
    // console.log('DOES SET BRANDS POP UP', setBrands)
    console.log('CONSOLE LOG SELECT  USER', selectUser)
    console.log('SET SHOW MODAL', setShowModal)

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
        dispatch(thunkPostBrands(newBrand))
            .then(res => {
                console.log('FINDING RES IN POST BRAND', res)
                if (res.error) {
                    setErrors([res.error])
                    return
                }
                console.log("INSIDE THUNKPOSTBRANDS DISPATCH", res)
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

    console.log('FINDING ERRORS', errors)

    return (
        <div>
            <div>
                {errors.map((error, idx) => (
                    <li style={errors.length ? { color: "red" } : null} key={idx}>{error}</li>
                ))}
            </div>
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
                <button className='button' type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default PostBrand
