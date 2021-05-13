import { Box } from "@material-ui/core";

const TabPanel = ({ children, value, index }) => {
    return (
        <div
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
};

export default TabPanel;
