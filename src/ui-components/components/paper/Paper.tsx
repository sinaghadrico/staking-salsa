import "./Paper.scss";

interface Props {
    children: React.ReactNode;
}
const Paper = ({ children }: Props) => {
    return <div className="ui-paper"> {children} </div>;
};
export default Paper;
