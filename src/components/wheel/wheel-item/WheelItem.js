import './WheelItem.css';

function WheelItem(props) {
    return (
        <div className={"wheel-item"}>
            <a href={props.link} target="_blank">
                <img
                    src={props.value}
                    alt={props.value} />
            </a>
        </div>
    );
}

export default WheelItem;