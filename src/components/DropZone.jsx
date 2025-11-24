// DropZone.js

import React from 'react';
import { useDrop } from 'react-dnd';

const DropZone = ({ onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                isOver
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 bg-gray-50'
            }`}>
            <i className="ri-drag-drop-line text-4xl text-gray-400 mb-2"></i>
            <p className='text-gray-500 font-medium'>
                {isOver ? 'Drop field here' : 'Drag and drop fields here'}
            </p>
            <p className='text-sm text-gray-400 mt-1'>or click to add fields</p>
        </div>
    );
};

export default DropZone;