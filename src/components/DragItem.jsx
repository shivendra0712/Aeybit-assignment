//DragItem.js

import React from 'react';
import { useDrag } from 'react-dnd';

const DragItem = ({ field }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { name: field.name, type: field.type },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className={`flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50 transition-all ${
                isDragging ? 'opacity-50' : 'opacity-100'
            }`}>
            <i className={`${field.icon} text-xl text-gray-600 mt-0.5`}></i>
            <div className='flex-1'>
                <h3 className='text-sm font-medium text-gray-800'>{field.name}</h3>
                <p className='text-xs text-gray-500 mt-0.5'>{field.description}</p>
            </div>
        </div>
    );
};

export default DragItem;