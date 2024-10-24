import React, { useState } from 'react';

// Utility function to convert hex to RGB
const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

// Utility function to calculate luminance
const luminance = (r, g, b) => {
    const a = [r, g, b].map(v => v / 255 <= 0.03928 ? v / 255 / 12.92 : Math.pow((v / 255 + 0.055) / 1.055, 2.4));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

// Utility function to calculate contrast ratio
const contrastRatio = (rgb1, rgb2) => {
    const lum1 = luminance(...rgb1);
    const lum2 = luminance(...rgb2);
    return (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
};

// Function to validate hex code
const isValidHex = (hex) => /^#([0-9A-Fa-f]{6})$/.test(hex);

const ColorContrastChecker = () => {
    const [color1, setColor1] = useState('#000000');
    const [color2, setColor2] = useState('#FFFFFF');
    const [result, setResult] = useState({ ratio: 0, isCompliant: false, colors: [] });
    const [error, setError] = useState({ color1: '', color2: '' });

    const handleCheckContrast = () => {
        // Validate hex codes for both colors
        const validColor1 = isValidHex(color1);
        const validColor2 = isValidHex(color2);

        if (!validColor1 || !validColor2) {
            setError({
                color1: !validColor1 ? 'Invalid hex code for Color 1' : '',
                color2: !validColor2 ? 'Invalid hex code for Color 2' : '',
            });
            return;
        }

        setError({ color1: '', color2: '' });
        if (validColor1 && validColor2) {
            const rgb1 = hexToRgb(color1);
            const rgb2 = hexToRgb(color2);
            const ratio = contrastRatio(rgb1, rgb2).toFixed(2);
            const isCompliant = ratio >= 4.5;

            // Store result, including the colors
            setResult({
                ratio,
                isCompliant,
                colors: isCompliant ? [color1, color2] : []
            });
        }
    };

    return (
        <div>
            <h1>Color Contrast Checker</h1>
            <div>
                <label>
                    Color 1 (Hex):
                    <input
                        type="text"
                        value={color1}
                        onChange={(e) => setColor1(e.target.value)}
                        placeholder="#000000"
                    />
                </label>
                {error.color1 && <p style={{ color: 'red' }}>{error.color1}</p>}
            </div>
            <div>
                <label>
                    Color 2 (Hex):
                    <input
                        type="text"
                        value={color2}
                        onChange={(e) => setColor2(e.target.value)}
                        placeholder="#FFFFFF"
                    />
                </label>
                {error.color2 && <p style={{ color: 'red' }}>{error.color2}</p>}
            </div>
            <button onClick={handleCheckContrast}>Check Contrast</button>
            <p class='colorsChecked'>Contrast Ratio: {result.ratio}</p>
            <p class='colorsChecked'>
                {result.isCompliant
                    ? `The contrast ratio is compliant with WCAG AA standards. Colors: ${result.colors.join(' and ')}`
                    : 'The contrast ratio is not compliant with WCAG AA standards.'}
            </p>
        </div>
    );
};

export default ColorContrastChecker;
