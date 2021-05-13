import React from "react";
import DatePicker from "react-datepicker";
import { Container, Typography } from "@material-ui/core";

import "react-datepicker/dist/react-datepicker.css";

const CustomDatePicker = (props) => {
    return (
        <Container>
            <Typography variant="h3">{props.placeholder}</Typography>
            <DatePicker
                selected={props.date}
                onChange={props.handleDateChange}
                maxDate={new Date()}
                dateFormat="MMM dd, yyyy"
                className="picker"
            />
        </Container>
    );
};

export default CustomDatePicker;
