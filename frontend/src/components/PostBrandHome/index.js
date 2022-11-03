import { faImages } from '@fortawesome/free-solid-svg-icons';
import { csrfFetch } from '../../store/csrf';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkPostBrands } from '../../store/brands';

const postPhoto = async ({ uploadedPhoto, file }) => {
    const formData = new FormData();
    formData.append("photo", uploadedPhoto);

    let data = { file }
    console.log('WHAT IS FILE IN POSTPHOTO', file)

    const response = await csrfFetch(`/api/uploads/photos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log('WHAT IS RESPONSE IN POSTPHOTO', response)
    console.log('WHAT IS RESPONSE.JSON IN POSTPHOTO', response.json())

    // return response.data
    const photos = await response.json();

    return photos
}


function PostBrand({ brands, setBrands, onClose, setShowModal }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [brandImg, setBrandImg] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [errors, setErrors] = useState([]);

    // aws
    const [file, setFile] = useState();
    const [photo, setPhoto] = useState([]);

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
                // MAYBE NEED LINE 53
                // setErrors([])
                // history.push({pathname:`/brands/${String(res.id)}`, state:{data: res}})
            })
        // if (brand) {
        //     // reset();
        //     // history.push(`/brands/${brand.id}`)
        //     history.push({pathname:`/brands/${brand.id}`, state:{data: brand}})
        // }
    };

    const imageForm = document.querySelector("#imageForm")
    const imageInput = document.querySelector("#imageInput")

    // imageForm.addEventListener("submit", async (e) => {
    //     e.preventDefault();
    //     const file = imageInput.files[0];

    //     // get a secure url form our server
    //     const {url} = await fetch("/s3URL").then(res => res.json())
    //     console.log(url)

    //     // post the image directly to the s3 bucket
    //     await fetch(url, {
    //         method: "PUT",
    //         HEADERS: {
    //             "Content-Type": "multipart/form-data"
    //         },
    //         body: file
    //     })

    //     const imageUrl = url.split('?')[0];
    //     console.log(imageUrl)

    //     // post request to my server to store any extra data
    //     const img = document.createElement("img");
    //     img.src = imageUrl;
    //     document.body.appendChild(img)
    // })

    // aws
    const submitAWS = async (e) => {
        e.preventDefault();
        const response = await postPhoto({ photo: file })
        setPhoto([response.photo, ...photo])
    }

    const fileSelected = e => {
        const file = e.target.files[0]
        setFile(file)
    }

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

                {/* this is s3 upload front end
                <form className='form' id="imageForm">
                    <input id="imageInput" type="file" accept="photo/*" />
                    <button className='button' type="submit">Upload</button>
                </form> */}

                <form onSubmit={submitAWS}>
                    <input onChange={fileSelected} type='file' accept='photo/*'></input>
                    <button type='submit'>Submit</button>
                </form>

                {photo.map(uploadedPhoto => {
                    <div key={uploadedPhoto}>
                        <img src={uploadedPhoto}></img>
                    </div>
                })}

                {/* <img src="/images/9fa06d3c5da7aec7f932beb5b3e60f1d"></img> */}

            </form>
        </div>
    );
}

export default PostBrand
