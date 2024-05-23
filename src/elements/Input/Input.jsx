const Input = (props) => {
    return (
        <input
            className={props.className}
            type={props.type}
            id={props.id}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
            style={props.style}
        >
        </input>
    )
}

export default Input