import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkPostBrands } from '../../store/brands';

function PostBrand() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [brandImg, setBrandImg] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const reset = () => {
        setBrandImg('');
        setName('');
        setAddress('');
        setCity('');
        setCountry('');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newBrand = {
            brandImg,
            name,
            address,
            city,
            country
        }

        const brand = await dispatch(thunkPostBrands(newBrand));
        if (brand) {
            reset();
            history.push(`/brands/${brand.id}`)
        }
    };

    return (
        <div>
            <h2>Upload New Brand</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    onChange={(event) => setBrandImg(event.target.value)}
                    value={brandImg}
                    placeholder='Brand Image'
                    name='brandImg'
                />
                <input
                    type='text'
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                    placeholder='Name'
                    name='name'
                />
                <input
                    type='text'
                    onChange={(event) => setAddress(event.target.value)}
                    value={address}
                    placeholder='Address'
                    name='address'
                />
                <input
                    type='text'
                    onChange={(event) => setCity(event.target.value)}
                    value={city}
                    placeholder='City'
                    name='city'
                />
                <input
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
