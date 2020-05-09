import { select, text, withKnobs } from '@storybook/addon-knobs';
import '../styles/critical.scss';
import '../styles/content.scss';

export default {
    title: 'Content/Buttons',
    decorators: [withKnobs],
};


export const Accents = () => {
    const textButton = text('text', 'I\'m button1');
    const classList = {
        'btn-primary': 'btn-primary',
        'btn-secondary': 'btn-secondary',
        'btn-danger': 'btn-danger',
        'btn-warn': 'btn-warn',
        'btn-success': 'btn-success',
      }
	const className = select('classname', classList, 'btn-primary');
	return `<button class="${className}">${textButton}</button>`;
};
