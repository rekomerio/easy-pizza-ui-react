import React from "react";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AddIcon from "@material-ui/icons/Add";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const MenuView = props => {
    const classes = useStyles();
    const { menu } = props;

    return (
        <div className={classes.root}>
            <Typography variant="h4">{menu.name}</Typography>
            <div>
                {menu.menuItems.map(item => (
                    <Paper elevation={2} className={classes.item}>
                        <div className={classes.flex}>
                            <div>
                                <Typography variant="h5">{item.name}</Typography>
                                <div>
                                    {item.ingredients.map(ingredient => (
                                        <Chip label={ingredient.name} variant="outlined" />
                                    ))}
                                </div>
                            </div>
                            <div>
                                <Typography variant="subtitle2" align="center">
                                    {item.price.toFixed(2) + "€"}
                                </Typography>
                                <span>
                                    <Fab
                                        color="secondary"
                                        aria-label="add"
                                        size="small"
                                        onClick={props.onClick(item)}
                                    >
                                        <AddIcon />
                                    </Fab>
                                </span>
                            </div>
                        </div>
                    </Paper>
                ))}
            </div>
        </div>
    );
};

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    item: {
        padding: theme.spacing(2),
        margin: theme.spacing(0.5)
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        textAlign: "left"
    },
    ingredient: {
        display: "inline"
    }
}));

export default MenuView;
