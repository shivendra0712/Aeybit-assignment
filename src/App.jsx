
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './components/DragItem';
import DropZone from './components/DropZone';

const App = () => {
  const [droppedItems, setDroppedItems] = useState([]);
  const [activeTab, setActiveTab] = useState('form-builder');

  const formFields = [
    { name: 'Text Input', type: 'text', icon: 'ri-edit-line', description: 'Single line text input' },
    { name: 'Email', type: 'email', icon: 'ri-mail-line', description: 'Email address input' },
    { name: 'Number', type: 'number', icon: 'ri-hashtag', description: 'Numeric input' },
    { name: 'Text Area', type: 'textarea', icon: 'ri-file-text-line', description: 'Multi-line text input' },
    { name: 'Dropdown', type: 'select', icon: 'ri-arrow-down-s-line', description: 'Dropdown select menu' },
    { name: 'Radio Buttons', type: 'radio', icon: 'ri-radio-button-line', description: 'Single choice radio buttons' },
    { name: 'Checkbox', type: 'checkbox', icon: 'ri-checkbox-line', description: 'Multiple choice checkboxes' },
  ];

  const handleDrop = (item) => {
    setDroppedItems((prevItems) => [...prevItems, {
      ...item,
      id: Date.now(),
      placeholder: `Enter ${item.type}`,
      required: false
    }]);
  };

  const handleRemoveItem = (id) => {
    setDroppedItems(droppedItems.filter(item => item.id !== id));
  };

  const handleNewForm = () => {
    setDroppedItems([]);
  };

  const handleUpdateItem = (id) => {
    const updatedItems = droppedItems.map(item => {
      if (item.id === id) {
        const newName = prompt('Enter new field name', item.name);
        return newName ? { ...item, name: newName } : item;
      }
      return item;
    });
    setDroppedItems(updatedItems);
  };

  const getFieldIcon = (type) => {
    const field = formFields.find(f => f.type === type);
    return field ? field.icon : 'ri-input-field';
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='w-full h-screen bg-linear-to-br from-blue-50 to-purple-50'>
        {/* Header Tabs */}
        <div className='flex border-b border-gray-200 bg-white'>
          <button
            onClick={() => setActiveTab('form-builder')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'form-builder'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}>
            Form Builder
          </button>
          <button
            onClick={() => setActiveTab('product-catalogue')}
            className={`px-6 py-4 font-medium transition-colors ${
              activeTab === 'product-catalogue'
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-800'
            }`}>
            Product Catalogue
          </button>
        </div>

        {/* Main Content */}
        <div className='flex h-[calc(100vh-57px)] gap-4 p-6'>
          {/* Left Panel - Form Fields */}
          <div className='w-[280px] bg-white rounded-lg shadow-sm p-4 overflow-y-auto'>
            <h2 className='text-lg font-semibold text-gray-800 mb-2'>Form Fields</h2>
            <p className='text-sm text-gray-500 mb-4'>Drag fields to the canvas</p>

            <div className='space-y-2'>
              {formFields.map((field) => (
                <DragItem key={field.type} field={field} />
              ))}
            </div>
          </div>

          {/* Center Panel - Canvas */}
          <div className='flex-1 bg-white rounded-lg shadow-sm p-6 overflow-y-auto'>
            <div className='flex justify-between items-center mb-6'>
              <h2 className='text-xl font-semibold text-gray-800'>test</h2>
              <button
                onClick={handleNewForm}
                className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors'>
                <i className="ri-add-line"></i>
                New Form
              </button>
            </div>

            <DropZone onDrop={handleDrop} />

            <div className='space-y-3 mt-4'>
              {droppedItems.map((item) => (
                <div
                  key={item.id}
                  className='bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors'>
                  <div className='flex items-start justify-between'>
                    <div className='flex items-start gap-3 flex-1'>
                      <i className="ri-menu-line text-gray-400 cursor-move mt-1"></i>
                      <div className='flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <i className={`${getFieldIcon(item.type)} text-gray-600`}></i>
                          <span className='font-medium text-gray-800'>{item.name}</span>
                          <span className='text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded'>
                            {item.type}
                          </span>
                          {item.type === 'textarea' && (
                            <span className='text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded'>
                              textarea
                            </span>
                          )}
                          {item.type === 'select' && (
                            <span className='text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded'>
                              select
                            </span>
                          )}
                        </div>
                        <p className='text-sm text-gray-500'>Placeholder: {item.placeholder}</p>
                        {item.required && (
                          <p className='text-xs text-red-500 mt-1'>* Required</p>
                        )}
                      </div>
                    </div>

                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleUpdateItem(item.id)}
                        className='p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors'>
                        <i className="ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className='p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors'>
                        <i className="ri-delete-bin-6-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Live Preview */}
        
          <div className='w-[320px] bg-white/20 rounded-lg shadow-sm p-6 overflow-y-auto'>
  <h2 className='text-lg font-semibold mb-6'>Live Preview</h2>

  <div className='space-y-4'>
    {droppedItems.map((item) => (
      <div key={item.id} className=''>
        <label className='block text-sm font-medium mb-2'>
          {item.name}
          {item.required && <span className='text-red-300 ml-1'>*</span>}
        </label>

        {item.type === 'textarea' ? (
          <textarea
            placeholder={item.placeholder}
            className='w-full px-3 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800'
            rows='3'
          />
        ) : item.type === 'select' ? (
          <select className='w-full px-3 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800'>
            <option>Select an option</option>
          </select>
        ) : item.type === 'radio' ? (
          <div className='space-y-2'>
            <label className='flex items-center border border-gray-300 p-2 rounded-lg'>
              <input type='radio' name={`radio-${item.id}`} className='mr-2' />
              Option 1
            </label>
            <label className='flex items-center border border-gray-300 p-2 rounded-lg'>
              <input type='radio' name={`radio-${item.id}`} className='mr-2' />
              Option 2
            </label>
          </div>
        ) : item.type === 'checkbox' ? (
          <div className='space-y-2'>
            <label className='flex items-center border border-gray-300 p-2 rounded-lg'>
              <input type='checkbox' className='mr-2' />
              Option 1
            </label>
            <label className='flex items-center border border-gray-300 p-2 rounded-lg'>
              <input type='checkbox' className='mr-2' />
              Option 2
            </label>
          </div>
        ) : (
          <input
            type={item.type}
            placeholder={item.placeholder}
            className='w-full px-3 py-2 bg-white/90 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800'
          />
        )}
      </div>
    ))}
  </div>
</div>

        </div>
      </div>
    </DndProvider>
  );
};

export default App;