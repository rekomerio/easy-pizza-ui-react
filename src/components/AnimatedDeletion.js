import React from "react";
import Collapse from "@material-ui/core/Collapse";
import Zoom from "@material-ui/core/Zoom";

const AnimatedDeletion = props => {
    const timeout = props.timeout || 500;

    React.useEffect(() => {
        const onDelete = () => {
            setTimeout(props.onDelete, timeout);
        };

        if (!props.isVisible) onDelete();
    }, [props.isVisible, timeout, props.onDelete]);

    return (
        <Collapse in={props.isVisible} timeout={timeout}>
            <Zoom in={props.isVisible} timeout={timeout}>
                {props.children}
            </Zoom>
        </Collapse>
    );
};

export default AnimatedDeletion;
