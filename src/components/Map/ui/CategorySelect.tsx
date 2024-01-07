import { useState } from 'react';
import { AppConfig } from '@lib/AppConfig'
import { StarIcon } from 'lucide-react'
import MarkerCategories, { MarkerCategoriesValues, MarkerCategoryType } from '@lib/MarkerCategories'

const colors = [
    '#28a745', // Green
    '#007bff', // Blue
    '#dc3545', // Red
    '#ffc107', // Yellow
    '#17a2b8', // Teal
    '#6610f2', // Purple
    '#e83e8c', // Pink
    '#20c997', // Mint
    '#fd7e14', // Orange
    '#6f42c1', // Violet
    '#343a40', // Dark
    '#17a2b8', // Aqua
    '#28a745', // Success
    '#dc3545', // Danger
    '#ffc107', // Warning
    '#f8f9fa', // Light
    '#6c757d', // Secondary
];

type DropdownProps = {
    options: MarkerCategoryType;
    onChange: (value: string) => void;
};

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<MarkerCategoriesValues | null>(null);

    const handleOptionChange = (option: MarkerCategoriesValues) => {
        setSelectedOption(option);
        onChange(option.name);
        setIsOpen(false); // Close the dropdown after selecting an option
    };

    // Define a type guard function
    function isMarkerCategoriesValues(value: any): value is MarkerCategoriesValues {
        return typeof value === 'object' && 'name' in value; // Replace with your actual type check
    }

    return (
        <div>
            <button
                style={{ zIndex: 400 }}
                className="button absolute rounded top-64 right-3 p-2 shadow-md text-dark bg-white"
                onClick={() => setIsOpen(!isOpen)}
            ><StarIcon size={AppConfig.ui.mapIconSize} /></button>
            <div style={{ position: 'relative' }}>

                {isOpen && (
                    <div className='top-64 right-3 absolute bg-white text-dark' style={{ zIndex: 500 }}>
                        <ul style={{ listStyle: 'none', padding: 0, zIndex: 500 }}>


                            {Object.entries(options).map(([optionKey, optionValue], index) => {
                                if (isMarkerCategoriesValues(optionValue)) {
                                    const option = optionValue;
                                    const color = colors[index % colors.length]; // Pick a color from the array based on the index
                                    return (
                                        <li
                                            key={option.name}
                                            onClick={() => handleOptionChange(option)}
                                            style={{
                                                padding: '12px 16px',
                                                margin: '8px 0',
                                                backgroundColor: color,
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                transition: 'background-color 0.3s ease',
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: '#ffffff', // Text color
                                                fontWeight: 600, // Bold text
                                                fontFamily: 'Arial, sans-serif', // Custom font family
                                                fontSize: '1rem', // Font size
                                                fontStyle: 'italic', // Font style (e.g., italic)
                                                lineHeight: '1.5', // Line height
                                            }}
                                        >
                                            <span style={{ flex: 1 }}>{option.name}</span>
                                        </li>
                                    );
                                } else {
                                    // Handle the case where optionValue is not of type MarkerCategoriesValues
                                    return null; // Or some other fallback
                                }
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export const CategorySelect: React.FC<{
}> = () => {
    const handleDropdownChange = (selectedValue: string) => {
        console.log('Selected value:', selectedValue);
        // Do something with the selected value
    };
    return (
        <Dropdown
            options={MarkerCategories}
            onChange={handleDropdownChange}
        />
    )
}
