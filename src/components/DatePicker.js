import DateTimePicker from 'react-datetime-picker';

export const DatePicker = (props) => {
    return(
        <div className="setting" >
            <label> {props.label} </label>
            <DateTimePicker
                value={props.value}
                defaultValue={props.value}
                onChange={(e) => props.onChange(e)}
                disableCalendar={true}
                format="y-MM-dd"
            />
        </div>
    )
}