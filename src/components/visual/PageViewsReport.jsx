import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import queryReport from "../logical/queryReport";
import DatePicker from "../../hooks/DatePicker";
import useStyles from "../../styles/useStyles";

import {
    Container,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableBody,
    Box,
    TableCell,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";

const PageViewsReport = ({ viewID }) => {
    const [reportData, setReportData] = useState([]);
    const [startDate, setStartDate] = useState(addDays(new Date(), -10));
    const [endDate, setEndDate] = useState(new Date());
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const classes = useStyles();
    let [totalViews, setTotalViews] = useState(0);

    const displayResults = (response) => {
        const queryResult = response.result.reports[0].data.rows;
        setTotalPages(queryResult.length);
        const total = response.result.reports[0].data.totals[0].values[0];
        let newReportData = [];
        queryResult.forEach((row, index) => {
            setTotalViews((prev) => prev + parseInt(row.metrics[0].values[0]));
            if (index < 10) {
                let tempObj = {
                    path: row.dimensions[0],
                    views: row.metrics[0].values[0],
                    perc: `${parseFloat(
                        (row.metrics[0].values[0] / total) * 100
                    ).toFixed(1)}%`,
                };
                newReportData.push(tempObj);
            }
        });
        setReportData(newReportData);
        setLoading(false);
    };

    useEffect(() => {
        const request = {
            viewID: viewID,
            startDate,
            endDate,
            metrics: "ga:pageviews",
            dimensions: ["ga:pagePath"],
            orderBy: {
                fieldName: "ga:pageViews",
                order: "DESCENDING",
            },
            filter: "ga:pagePath!@localhost/",
        };
        setLoading(true);
        setTimeout(
            () =>
                queryReport(request)
                    .then((resp) => displayResults(resp))
                    .catch((error) => console.log(error)),
            1000
        );
    }, [startDate, endDate, viewID]);

    return (
        <Container>
            {loading ? (
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            ) : (
                <>
                    <Typography variant="h3">Top 10 Pages by Views</Typography>
                    <Typography variant="h5">
                        {`Total pages - ${totalPages}`}
                    </Typography>
                    <Typography variant="h4">
                        {`Total views - ${totalViews}`}
                    </Typography>
                    <Box>
                        <DatePicker
                            placeholder={"Start date"}
                            date={startDate}
                            handleDateChange={(date) => setStartDate(date)}
                        />
                        <DatePicker
                            placeholder={"End date"}
                            date={endDate}
                            handleDateChange={(date) => setEndDate(date)}
                        />
                    </Box>
                    {reportData.length && (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Page</TableCell>
                                        <TableCell>Views</TableCell>
                                        <TableCell>%</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {reportData.map((row, id) => (
                                        <TableRow key={id}>
                                            <TableCell>{row.path}</TableCell>
                                            <TableCell>{row.views}</TableCell>
                                            <TableCell>{row.perc}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </>
            )}
        </Container>
    );
};

export default PageViewsReport;
