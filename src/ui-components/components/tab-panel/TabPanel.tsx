import "./TabPanel.scss";

interface Props {
    children: React.ReactNode;
    value: any;
    index: any;
}
const TabPanel = ({ children, value, index }: Props) => {
    if (value !== index) return null;
    return <div className="ui-tab-panel"> {children} </div>;
};
export default TabPanel;
