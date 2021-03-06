import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import React, { Component } from "react";

interface IOptionsTabProps {
    highlightColor: {
        r: number,
        g: number,
        b: number,
    };
    applyHighlightColor: (newColor: object) => void;
}

const ColorSlider = (hexColor: string) => withStyles({
  active: {},
  rail: {
    borderRadius: 4,
    height: 8,
  },
  root: {
    color: hexColor,
    height: 8,
  },
  thumb: {
    "&:focus,&:hover,&$active": {
      boxShadow: "inherit",
    },
    "backgroundColor": "#fff",
    "border": "2px solid currentColor",
    "height": 24,
    "marginLeft": -12,
    "marginTop": -8,
    "width": 24,
  },
  track: {
    borderRadius: 4,
    height: 8,
  },
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
})(Slider);

// #52af77
const RedSlider = ColorSlider("#d40000");
const GrnSlider = ColorSlider("#00d400");
const BluSlider = ColorSlider("#0051d3");

export default class OptionsTab extends Component<IOptionsTabProps, {}>  {
    public state: {[key: string]: any} = {};

    constructor(props: any) {
        super(props);
        this.state = {
            ...props.highlightColor,
        };
    }

    public handleSliderChange = (val: number | number[], color: string) => {
        this.setState({
            [color]: val,
        });
    }

    public decrementColorValue = (color: string) => {
        const curVal = this.state[color];
        const decremented = curVal - (curVal % 5 ? curVal % 5 : 5);
        const newVal = decremented < 0 ? 0 : decremented;
        this.setState({
            [color]: newVal,
        });
    }

    public incrementColorValue = (color: string) => {
        const curVal = this.state[color];
        const incremented = curVal + (5 - curVal % 5);
        const newVal = incremented > 255 ? 255 : incremented;
        this.setState({
            [color]: newVal,
        });
    }

    public applyColor = () => {
        this.props.applyHighlightColor({
            b: this.state.b,
            g: this.state.g,
            r: this.state.r,
        });
    }

    public componentWillReceiveProps = (props: any) => {
        this.setState({
            ...props.highlightColor,
        });
    }

    public render() {
        const highlightStyle = {backgroundColor: `rgb(${this.state.r},${this.state.g},${this.state.b})`};
        return (
            <div className="options-container">
                <div className="highlight-title">
                    Highlight
                </div>
                <div className="color-slider-container">
                    <IconButton className="color-adjust-button dec-red"
                        onClick={
                            (event) => this.decrementColorValue("r")
                        } size="small" edge="start" aria-label="decrease-red-highlight" >
                        <KeyboardArrowLeftIcon/>
                    </IconButton>
                    <RedSlider className="color-slider" defaultValue={this.state.r} value={this.state.r}
                    onChange={
                            (event, val) => this.handleSliderChange(val, "r")
                            } max={255} valueLabelDisplay="auto" />
                    <IconButton className="color-adjust-button inc-red"
                        onClick={
                            (event) => this.incrementColorValue("r")
                        }
                        size="small" edge="end" aria-label="increase-red-highlight" >
                        <KeyboardArrowRightIcon/>
                    </IconButton>
                </div>
                <div className="color-slider-container">
                    <IconButton className="color-adjust-button dec-grn"
                        onClick={
                            (event) => this.decrementColorValue("g")
                        }
                        size="small" edge="start" aria-label="decrease-red-highlight" >
                        <KeyboardArrowLeftIcon/>
                    </IconButton>
                    <GrnSlider className="color-slider" defaultValue={this.state.g} value={this.state.g}
                        onChange={
                            (event, val) => this.handleSliderChange(val, "g")
                        } max={255} valueLabelDisplay="auto" />
                    <IconButton className="color-adjust-button inc-blu"
                        onClick={
                            (event) => this.incrementColorValue("g")
                        }
                        size="small" edge="end" aria-label="increase-red-highlight" >
                        <KeyboardArrowRightIcon/>
                    </IconButton>
                </div>
                <div className="color-slider-container">
                    <IconButton className="color-adjust-button dec-blu"
                        onClick={
                            (event) => this.decrementColorValue("b")
                        }
                        size="small" edge="start" aria-label="decrease-red-highlight" >
                        <KeyboardArrowLeftIcon/>
                    </IconButton>
                    <BluSlider className="color-slider" defaultValue={this.state.b} value={this.state.b}
                        onChange={
                            (event, val) => this.handleSliderChange(val, "b")
                        } max={255} valueLabelDisplay="auto" />
                    <IconButton className="color-adjust-button inc-blu"
                        onClick={
                            (event) => this.incrementColorValue("b")
                        }
                        size="small" edge="end" aria-label="increase-red-highlight" >
                        <KeyboardArrowRightIcon/>
                    </IconButton>
                </div>
                <Paper className="highlight-example-container">
                    <Typography className="highlight-example" style={highlightStyle} variant="body1">
                        The quick brown fox...
                    </Typography>
                </Paper>
                <div className="highlight-apply-button-container">
                    <Button
                        className="highlight-apply-button"
                        variant="outlined"
                        color="secondary"
                        onClick={this.applyColor}>
                        <div className="highlight-apply-button-text">
                            Apply Highlight Color
                        </div>
                    </Button>
                </div>
            </div>
        );
    }
}
