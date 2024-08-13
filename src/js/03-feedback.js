
import throttle from 'lodash.throttle';


const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';
let formData = {};

const saveFormState = throttle((event) => {
    formData[event.target.name] = event.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

const populateForm = () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        formData = JSON.parse(savedData);
        for (const [name, value] of Object.entries(formData)) {
            form.elements[name].value = value;
        }
    }
};

form.addEventListener('input', saveFormState);

form.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(formData);
    localStorage.removeItem(STORAGE_KEY);
    form.reset();
    formData = {}; 
});

populateForm();
