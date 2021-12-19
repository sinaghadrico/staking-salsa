import * as PropTypes from "prop-types";
import { QueryClient, QueryClientProvider } from "react-query";

const QueryClientContainer = ({ children }: any) => {
    const queryClient = new QueryClient();
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
QueryClientContainer.propTypes = {
    children: PropTypes.node,
};
export default QueryClientContainer;
