const Button = (props) => {
    return (
        <button
            type={props.type}
            className={props.className}
            onClick={props.onClick}
        // btn btn-primary w-100 mt-5
        >
            {props.label}
        </button>

    );
}

export default Button