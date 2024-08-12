
import { iconCheck } from '../../../assets/svg/icons';
import { Colors } from '../../../config/customizationConfig';

export function ColorRadioButton(props: { color: Colors; id: Colors; colorHex: string; checked: boolean; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
    
    return (
        <div>
            <input
                type="radio"
                name="color-selection"
                value={props.color}
                id={props.color}
                defaultChecked={props.checked}
                onChange={props.onChange}
                className='color-input'
            />
            <label
                htmlFor={props.color}
                className={'color-label'}
                style={{ backgroundColor: props.colorHex }}
            >
                <span className="check-icon">{iconCheck}</span>
            </label>
        </div>
    );
}