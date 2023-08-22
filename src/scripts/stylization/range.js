export const rangeInput = document.querySelector('.calculator__range-input');
let isRTL = document.documentElement.dir === 'rtl';

function handleInputChange(e) {
    let target = e.target;
    const min = target.min;
    const max = target.max;
    const val = target.value;
    let percentage = (val - min) * 100 / (max - min);
    if (isRTL) {
        percentage = (max - val); 
    }
    
    target.style.backgroundSize = percentage + '% 100%';
}


rangeInput.addEventListener('input', handleInputChange);