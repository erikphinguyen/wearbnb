import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostBrandHome from '../PostBrandHome';

function PostBrandModal({brands, setBrands}) {
    const [showModal, setShowModal] = useState(false);



    return (
        <>
            <button  className='button' onClick={() => setShowModal(true)}>Add A Brand</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostBrandHome setShowModal={setShowModal} brands={brands} setBrands={setBrands}/>
                </Modal>
            )}
        </>
    );
}

export default PostBrandModal;
