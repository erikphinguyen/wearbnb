import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import PostBrandHome from '../PostBrandHome';

function PostBrandModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button className='button' onClick={() => setShowModal(true)}>Add A Brand</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <PostBrandHome />
                </Modal>
            )}
        </>
    );
}

export default PostBrandModal;
