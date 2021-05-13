import { format } from 'date-fns';

const queryReport = ({
    viewID,
    startDate,
    endDate,
    metrics,
    dimensions,
    orderBy,
    filter
}) => {

    const requestDimensions = (dimensions) => {
        let results = [];
        dimensions.forEach((item) => {
            results.push({
                name: item,
            });
        });
        return results;
    }

    return window.gapi.client.request({
        path: "/v4/reports:batchGet",
        root: "https://analyticsreporting.googleapis.com/",
        method: "POST",
        body: {
            reportRequests: [
                {
                    viewId: viewID,
                    filtersExpression: filter,
                    dateRanges: [
                        {
                            startDate: format(new Date(startDate), "yyyy-MM-dd"),
                            endDate: format(new Date(endDate), "yyyy-MM-dd"),
                        },
                    ],
                    metrics: [
                        {
                            expression: metrics,
                        },
                    ],
                    dimensions: requestDimensions(dimensions),
                    orderBys: orderBy
                        ? [
                            {
                                fieldName: orderBy.fieldName,
                                sortOrder: orderBy.order,
                            },
                        ]
                        : [],
                },
            ],
        },
    })
}

export default queryReport;